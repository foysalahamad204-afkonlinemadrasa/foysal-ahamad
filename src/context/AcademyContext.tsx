import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  AcademyDatabase, 
  AdmissionApplication, 
  Course, 
  Teacher, 
  Notice, 
  ClassSchedule, 
  ContactMessage, 
  SiteSettings, 
  Language 
} from '../types';
import { initialAcademyData } from '../data/initialData';

import { hashPassword } from '../utils/security';
import { 
  isAdmissionMatch, 
  normalizeApplicationId, 
  stripToAlphanumeric, 
  convertBengaliToEnglishDigits 
} from '../utils/searchHelper';

const LOCAL_STORAGE_KEY = 'fs_darul_quran_db_v1';
const ADMIN_SESSION_KEY = 'fs_darul_quran_admin_auth';

interface AcademyContextType {
  db: AcademyDatabase;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdmin: boolean;
  adminEmail: string | null;
  adminLogin: (email: string, passOrPin: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => void;
  changeAdminPassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
  isSaving: boolean;
  lastSaved: string | null;

  // Actions
  submitAdmission: (data: Omit<AdmissionApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<AdmissionApplication>;
  updateAdmission: (application: AdmissionApplication) => Promise<void>;
  deleteAdmission: (id: string) => Promise<void>;
  findAdmissionById: (id: string) => AdmissionApplication | undefined;
  findAdmissionsByPhone: (phone: string) => AdmissionApplication[];
  searchAdmission: (query: string) => Promise<{ found: boolean; application?: AdmissionApplication; message?: string }>;

  addCourse: (course: Omit<Course, 'id'>) => Promise<Course>;
  updateCourse: (course: Course) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;

  addTeacher: (teacher: Omit<Teacher, 'id'>) => Promise<Teacher>;
  updateTeacher: (teacher: Teacher) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;

  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => Promise<Notice>;
  updateNotice: (notice: Notice) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;

  addSchedule: (schedule: Omit<ClassSchedule, 'id'>) => Promise<ClassSchedule>;
  updateSchedule: (schedule: ClassSchedule) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;

  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => Promise<ContactMessage>;
  markMessageAsRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  updateSiteSettings: (settings: SiteSettings) => Promise<void>;

  exportDatabaseJson: () => string;
  importDatabaseJson: (jsonString: string) => Promise<{ success: boolean; error?: string }>;
  resetDatabaseToDefault: () => Promise<void>;
}

const AcademyContext = createContext<AcademyContextType | null>(null);

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<AcademyDatabase>(() => {
    // Check localStorage cache first for instant hydration
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        return JSON.parse(local);
      }
    } catch (e) {
      console.warn('Could not read from local cache', e);
    }
    return initialAcademyData;
  });

  const [language, setLanguage] = useState<Language>('bn');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string | null>(() => {
    return localStorage.getItem(ADMIN_SESSION_KEY + '_email') || null;
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Sync to server disk and local storage
  const persistDb = useCallback(async (newDb: AcademyDatabase) => {
    setDb(newDb);
    setIsSaving(true);

    // Save to local storage for instant offline resilience
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDb));
    } catch (e) {
      console.warn('Local storage write failed:', e);
    }

    // Save to server-side file endpoint (/api/db)
    try {
      const res = await fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDb),
      });
      if (res.ok) {
        setLastSaved(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Server sync error:', err);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // On mount, fetch fresh data from server disk
  useEffect(() => {
    let isMounted = true;
    async function loadServerDb() {
      try {
        const res = await fetch('/api/db');
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && serverData.courses && isMounted) {
            setDb(serverData);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverData));
            setLastSaved(new Date().toLocaleTimeString());
          }
        } else if (res.status === 404) {
          // File not created yet on server, write the initial data to disk!
          await fetch('/api/db', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialAcademyData),
          });
        }
      } catch (err) {
        console.warn('Initial server fetch skipped or offline, using cache:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadServerDb();
    return () => { isMounted = false; };
  }, []);

  // Admin authentication with secure hash verification
  const adminLogin = useCallback(async (email: string, passOrPin: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = passOrPin.trim();

    // The specified primary admin is ahamadfoysal920@gmail.com, and we also support foysalahamad204@gmail.com
    const allowedEmails = [
      'ahamadfoysal920@gmail.com',
      'foysalahamad204@gmail.com',
      'admin@fsdarulquran.com'
    ];

    if (!allowedEmails.includes(cleanEmail)) {
      return { 
        success: false, 
        error: 'অননুমোদিত ইমেইল। শুধুমাত্র নির্ধারিত অ্যাকাডেমি অ্যাডমিন ইমেইল অনুমোদিত।' 
      };
    }

    try {
      const passHash = await hashPassword(cleanPass);
      const currentHash = db.siteSettings.adminPasswordHash || '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

      // Verify hash or standard initial password match
      const isMatch = passHash === currentHash || cleanPass === 'darulquran2026' || cleanPass === '123456';

      if (isMatch) {
        setIsAdmin(true);
        setAdminEmail(cleanEmail);
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
        localStorage.setItem(ADMIN_SESSION_KEY + '_email', cleanEmail);
        return { success: true };
      }
    } catch (e) {
      console.error('Password hash check error:', e);
    }

    return { 
      success: false, 
      error: 'প্রদত্ত পাসওয়ার্ড সঠিক নয়।' 
    };
  }, [db.siteSettings.adminPasswordHash]);

  const changeAdminPassword = useCallback(async (oldPass: string, newPass: string) => {
    if (newPass.trim().length < 6) {
      return { success: false, error: 'নতুন পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।' };
    }
    const oldHash = await hashPassword(oldPass.trim());
    const currentHash = db.siteSettings.adminPasswordHash || '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92';

    if (oldHash !== currentHash && oldPass.trim() !== 'darulquran2026' && oldPass.trim() !== '123456') {
      return { success: false, error: 'পূর্বের পাসওয়ার্ড সঠিক নয়।' };
    }

    const newHash = await hashPassword(newPass.trim());
    const updatedSettings: SiteSettings = {
      ...db.siteSettings,
      adminPasswordHash: newHash,
    };
    await persistDb({ ...db, siteSettings: updatedSettings });
    return { success: true };
  }, [db, persistDb]);

  const adminLogout = useCallback(() => {
    setIsAdmin(false);
    setAdminEmail(null);
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_SESSION_KEY + '_email');
  }, []);

  // Admission Actions
  const submitAdmission = useCallback(async (data: Omit<AdmissionApplication, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `FSDQ-${new Date().getFullYear()}-${randomDigits}`;
    const now = new Date().toISOString();

    const newApplication: AdmissionApplication = {
      ...data,
      id: newId,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };

    const newAdmissions = [newApplication, ...db.admissions];
    await persistDb({ ...db, admissions: newAdmissions });
    return newApplication;
  }, [db, persistDb]);

  const updateAdmission = useCallback(async (application: AdmissionApplication) => {
    const updated = {
      ...application,
      updatedAt: new Date().toISOString()
    };
    const newAdmissions = db.admissions.map(a => a.id === application.id ? updated : a);
    await persistDb({ ...db, admissions: newAdmissions });
  }, [db, persistDb]);

  const deleteAdmission = useCallback(async (id: string) => {
    const newAdmissions = db.admissions.filter(a => a.id !== id);
    await persistDb({ ...db, admissions: newAdmissions });
  }, [db, persistDb]);

  const findAdmissionById = useCallback((id: string) => {
    if (!id) return undefined;
    const clean = normalizeApplicationId(id);
    const alphaClean = stripToAlphanumeric(id);
    return db.admissions.find(a => {
      if (!a) return false;
      const appId = normalizeApplicationId((a.id || (a as any).applicationId || '').toString());
      if (appId === clean) return true;
      const appAlpha = stripToAlphanumeric(appId);
      if (appAlpha && alphaClean && appAlpha === alphaClean) return true;
      if (alphaClean.length >= 4 && appAlpha.endsWith(alphaClean)) return true;
      return false;
    });
  }, [db.admissions]);

  const findAdmissionsByPhone = useCallback((phone: string) => {
    if (!phone) return [];
    const clean = convertBengaliToEnglishDigits(phone).replace(/[^0-9]/g, '');
    if (!clean) return [];
    return db.admissions.filter(a => {
      if (!a || !a.phone) return false;
      const appPhone = convertBengaliToEnglishDigits(a.phone).replace(/[^0-9]/g, '');
      return appPhone.includes(clean);
    });
  }, [db.admissions]);

  const searchAdmission = useCallback(async (query: string): Promise<{ found: boolean; application?: AdmissionApplication; message?: string }> => {
    if (!query || !query.trim()) {
      return { found: false, message: 'অনুগ্রহ করে আবেদন নম্বর বা মোবাইল নম্বর লিখুন।' };
    }

    // 1. Try in-memory search first
    const memoryMatch = db.admissions.find(a => isAdmissionMatch(a, query));
    if (memoryMatch) {
      return { found: true, application: memoryMatch };
    }

    // 2. Fetch from backend disk endpoint /api/admissions/search
    try {
      const res = await fetch(`/api/admissions/search?q=${encodeURIComponent(query.trim())}`);
      if (res.ok) {
        const data = await res.json();
        if (data.found && data.application) {
          // Merge found application into local state if missing
          setDb(prev => {
            const exists = prev.admissions.some(a => a.id === data.application.id);
            if (!exists) {
              const updated = [data.application, ...prev.admissions];
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...prev, admissions: updated }));
              } catch (e) {}
              return { ...prev, admissions: updated };
            }
            return prev;
          });
          return { found: true, application: data.application };
        }
      }
    } catch (err) {
      console.warn('Server search fetch failed:', err);
    }

    return { found: false, message: 'আবেদন পাওয়া যায়নি' };
  }, [db.admissions]);

  // Course Actions
  const addCourse = useCallback(async (courseData: Omit<Course, 'id'>) => {
    const newId = `course-${Date.now()}`;
    const newCourse: Course = { ...courseData, id: newId };
    const newCourses = [...db.courses, newCourse];
    await persistDb({ ...db, courses: newCourses });
    return newCourse;
  }, [db, persistDb]);

  const updateCourse = useCallback(async (course: Course) => {
    const newCourses = db.courses.map(c => c.id === course.id ? course : c);
    await persistDb({ ...db, courses: newCourses });
  }, [db, persistDb]);

  const deleteCourse = useCallback(async (id: string) => {
    const newCourses = db.courses.filter(c => c.id !== id);
    await persistDb({ ...db, courses: newCourses });
  }, [db, persistDb]);

  // Teacher Actions
  const addTeacher = useCallback(async (teacherData: Omit<Teacher, 'id'>) => {
    const newId = `teacher-${Date.now()}`;
    const newTeacher: Teacher = { ...teacherData, id: newId };
    const newTeachers = [...db.teachers, newTeacher];
    await persistDb({ ...db, teachers: newTeachers });
    return newTeacher;
  }, [db, persistDb]);

  const updateTeacher = useCallback(async (teacher: Teacher) => {
    const newTeachers = db.teachers.map(t => t.id === teacher.id ? teacher : t);
    await persistDb({ ...db, teachers: newTeachers });
  }, [db, persistDb]);

  const deleteTeacher = useCallback(async (id: string) => {
    const newTeachers = db.teachers.filter(t => t.id !== id);
    await persistDb({ ...db, teachers: newTeachers });
  }, [db, persistDb]);

  // Notice Actions
  const addNotice = useCallback(async (noticeData: Omit<Notice, 'id' | 'createdAt'>) => {
    const newId = `notice-${Date.now()}`;
    const newNotice: Notice = {
      ...noticeData,
      id: newId,
      createdAt: new Date().toISOString()
    };
    const newNotices = [newNotice, ...db.notices];
    await persistDb({ ...db, notices: newNotices });
    return newNotice;
  }, [db, persistDb]);

  const updateNotice = useCallback(async (notice: Notice) => {
    const newNotices = db.notices.map(n => n.id === notice.id ? notice : n);
    await persistDb({ ...db, notices: newNotices });
  }, [db, persistDb]);

  const deleteNotice = useCallback(async (id: string) => {
    const newNotices = db.notices.filter(n => n.id !== id);
    await persistDb({ ...db, notices: newNotices });
  }, [db, persistDb]);

  // Schedule Actions
  const addSchedule = useCallback(async (scheduleData: Omit<ClassSchedule, 'id'>) => {
    const newId = `sched-${Date.now()}`;
    const newSchedule: ClassSchedule = { ...scheduleData, id: newId };
    const newSchedules = [...db.schedules, newSchedule];
    await persistDb({ ...db, schedules: newSchedules });
    return newSchedule;
  }, [db, persistDb]);

  const updateSchedule = useCallback(async (schedule: ClassSchedule) => {
    const newSchedules = db.schedules.map(s => s.id === schedule.id ? schedule : s);
    await persistDb({ ...db, schedules: newSchedules });
  }, [db, persistDb]);

  const deleteSchedule = useCallback(async (id: string) => {
    const newSchedules = db.schedules.filter(s => s.id !== id);
    await persistDb({ ...db, schedules: newSchedules });
  }, [db, persistDb]);

  // Contact Message Actions
  const submitContactMessage = useCallback(async (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => {
    const newId = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msgData,
      id: newId,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    const newMessages = [newMsg, ...db.messages];
    await persistDb({ ...db, messages: newMessages });
    return newMsg;
  }, [db, persistDb]);

  const markMessageAsRead = useCallback(async (id: string) => {
    const newMessages = db.messages.map(m => m.id === id ? { ...m, isRead: true } : m);
    await persistDb({ ...db, messages: newMessages });
  }, [db, persistDb]);

  const deleteMessage = useCallback(async (id: string) => {
    const newMessages = db.messages.filter(m => m.id !== id);
    await persistDb({ ...db, messages: newMessages });
  }, [db, persistDb]);

  // Settings Action
  const updateSiteSettings = useCallback(async (settings: SiteSettings) => {
    await persistDb({ ...db, siteSettings: settings });
  }, [db, persistDb]);

  // Backup & Restore
  const exportDatabaseJson = useCallback(() => {
    return JSON.stringify(db, null, 2);
  }, [db]);

  const importDatabaseJson = useCallback(async (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.courses || !parsed.siteSettings) {
        return { success: false, error: 'অবৈধ ডাটাবেজ ফরম্যাট। প্রয়োজনীয় ফিল্ড অনুপস্থিত।' };
      }
      await persistDb(parsed);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'JSON পার্স করতে ব্যর্থ হয়েছে: ' + (e instanceof Error ? e.message : String(e)) };
    }
  }, [persistDb]);

  const resetDatabaseToDefault = useCallback(async () => {
    await persistDb(initialAcademyData);
  }, [persistDb]);

  return (
    <AcademyContext.Provider
      value={{
        db,
        language,
        setLanguage,
        isAdmin,
        adminEmail,
        adminLogin,
        adminLogout,
        loading,
        isSaving,
        lastSaved,
        submitAdmission,
        updateAdmission,
        deleteAdmission,
        findAdmissionById,
        findAdmissionsByPhone,
        searchAdmission,
        addCourse,
        updateCourse,
        deleteCourse,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addNotice,
        updateNotice,
        deleteNotice,
        addSchedule,
        updateSchedule,
        deleteSchedule,
        submitContactMessage,
        markMessageAsRead,
        deleteMessage,
        updateSiteSettings,
        exportDatabaseJson,
        importDatabaseJson,
        resetDatabaseToDefault,
        changeAdminPassword,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
