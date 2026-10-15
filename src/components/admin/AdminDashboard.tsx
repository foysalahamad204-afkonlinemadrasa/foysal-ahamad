import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  Calendar, 
  Bell, 
  MessageSquare, 
  Settings, 
  Database, 
  LogOut, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit3, 
  Trash2, 
  Plus, 
  Save, 
  Download, 
  Upload, 
  RefreshCw, 
  Video, 
  Search,
  Filter,
  Eye,
  AlertCircle,
  Lock
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { 
  AdmissionApplication, 
  Course, 
  Teacher, 
  Notice, 
  ClassSchedule, 
  SiteSettings 
} from '../../types';
import { isAdmissionMatch } from '../../utils/searchHelper';

export const AdminDashboard: React.FC = () => {
  const { 
    db, 
    adminLogout, 
    adminEmail, 
    changeAdminPassword,
    updateAdmission, 
    deleteAdmission,
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
    markMessageAsRead,
    deleteMessage,
    updateSiteSettings,
    exportDatabaseJson,
    importDatabaseJson,
    resetDatabaseToDefault,
    lastSaved,
    isSaving
  } = useAcademy();

  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'courses' | 'teachers' | 'schedules' | 'notices' | 'messages' | 'settings' | 'backup'>('overview');

  // Admissions Filtering & Search
  const [admissionFilter, setAdmissionFilter] = useState<string>('all');
  const [admissionSearch, setAdmissionSearch] = useState<string>('');
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionApplication | null>(null);

  // Password Change State
  const [oldPasswordInput, setOldPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmNewPasswordInput, setConfirmNewPasswordInput] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Course Edit Modal / Form State
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [isNewCourse, setIsNewCourse] = useState(false);

  // Teacher Edit State
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher> | null>(null);
  const [isNewTeacher, setIsNewTeacher] = useState(false);

  // Notice Edit State
  const [editingNotice, setEditingNotice] = useState<Partial<Notice> | null>(null);
  const [isNewNotice, setIsNewNotice] = useState(false);

  // Schedule Edit State
  const [editingSchedule, setEditingSchedule] = useState<Partial<ClassSchedule> | null>(null);
  const [isNewSchedule, setIsNewSchedule] = useState(false);

  // Settings State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(db.siteSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Backup State
  const [importJsonText, setImportJsonText] = useState('');
  const [backupFeedback, setBackupFeedback] = useState<string>('');

  // Stats calculation
  const totalApplications = db.admissions.length;
  const pendingApplications = db.admissions.filter(a => a.status === 'pending').length;
  const trialScheduled = db.admissions.filter(a => a.status === 'trial_scheduled').length;
  const approvedStudents = db.admissions.filter(a => a.status === 'approved' || a.status === 'enrolled').length;
  const unreadMessages = db.messages.filter(m => !m.isRead).length;

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Filtered Admissions
  const filteredAdmissions = db.admissions.filter(app => {
    const matchesFilter = admissionFilter === 'all' || app.status === admissionFilter;
    const matchesSearch = !admissionSearch.trim() || 
      isAdmissionMatch(app, admissionSearch) ||
      app.studentName.toLowerCase().includes(admissionSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Admission Status Handler
  const handleUpdateStatus = async (app: AdmissionApplication, newStatus: AdmissionApplication['status']) => {
    const updated = { ...app, status: newStatus };
    await updateAdmission(updated);
    if (selectedAdmission && selectedAdmission.id === app.id) {
      setSelectedAdmission(updated);
    }
  };

  const handleSaveAdmissionDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdmission) return;
    await updateAdmission(selectedAdmission);
    setSaveSuccessMsg('শিক্ষার্থীর বিবরণ সফলভাবে আপডেট হয়েছে!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // Course Save
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse || !editingCourse.titleBn) return;

    if (isNewCourse) {
      await addCourse(editingCourse as any);
    } else {
      await updateCourse(editingCourse as Course);
    }
    setEditingCourse(null);
  };

  // Teacher Save
  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher || !editingTeacher.nameBn) return;

    if (isNewTeacher) {
      await addTeacher(editingTeacher as any);
    } else {
      await updateTeacher(editingTeacher as Teacher);
    }
    setEditingTeacher(null);
  };

  // Notice Save
  const handleSaveNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.titleBn) return;

    if (isNewNotice) {
      await addNotice(editingNotice as any);
    } else {
      await updateNotice(editingNotice as Notice);
    }
    setEditingNotice(null);
  };

  // Schedule Save
  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSchedule || !editingSchedule.courseNameBn) return;

    if (isNewSchedule) {
      await addSchedule(editingSchedule as any);
    } else {
      await updateSchedule(editingSchedule as ClassSchedule);
    }
    setEditingSchedule(null);
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Admin Password Change
  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeStatus(null);

    if (newPasswordInput !== confirmNewPasswordInput) {
      setPasswordChangeStatus({ type: 'error', message: 'নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না।' });
      return;
    }
    if (newPasswordInput.length < 6) {
      setPasswordChangeStatus({ type: 'error', message: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
      return;
    }

    try {
      setIsChangingPassword(true);
      const res = await changeAdminPassword(oldPasswordInput, newPasswordInput);
      if (res.success) {
        setPasswordChangeStatus({ type: 'success', message: 'অ্যাডমিন পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' });
        setOldPasswordInput('');
        setNewPasswordInput('');
        setConfirmNewPasswordInput('');
      } else {
        setPasswordChangeStatus({ type: 'error', message: res.error || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।' });
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // JSON Export
  const handleDownloadBackup = () => {
    const json = exportDatabaseJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fs_darul_quran_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // JSON Import
  const handleImportJson = async () => {
    if (!importJsonText.trim()) return;
    const res = await importDatabaseJson(importJsonText);
    if (res.success) {
      setBackupFeedback('ডাটাবেজ সফলভাবে রিস্টোর হয়েছে!');
      setImportJsonText('');
    } else {
      setBackupFeedback('ত্রুটি: ' + res.error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
      {/* Top Header Bar */}
      <div className="bg-[#022C22] text-white rounded-2xl p-6 mb-8 border-2 border-amber-500 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-emerald-950 font-black text-xs px-2.5 py-0.5 rounded">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-amber-200">
              {adminEmail || 'ahamadfoysal920@gmail.com'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            FS Darul Quran Online Academy ড্যাশবোর্ড
          </h1>
          <div className="flex items-center gap-2 text-xs text-emerald-200/80 mt-1">
            <span>ডাটাবেজ স্ট্যাটাস:</span>
            <span className="font-semibold text-emerald-300">
              {isSaving ? 'সংরক্ষণ হচ্ছে...' : lastSaved ? `সক্রিয় ও সংরক্ষিত (${lastSaved})` : 'সক্রিয়'}
            </span>
          </div>
        </div>

        <button
          onClick={adminLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer border border-red-400 shadow-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>লগআউট করুন</span>
        </button>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex flex-wrap gap-2 mb-8 bg-stone-100 p-2 rounded-2xl border border-stone-200">
        {[
          { id: 'overview', label: 'ওভারভিউ', icon: Users, badge: null },
          { id: 'admissions', label: 'ভর্তি আবেদন ও শিক্ষার্থী', icon: GraduationCap, badge: pendingApplications > 0 ? pendingApplications : null },
          { id: 'courses', label: 'কোর্সসমূহ', icon: BookOpen, badge: db.courses.length },
          { id: 'teachers', label: 'শিক্ষকমণ্ডলী', icon: UserCheck, badge: db.teachers.length },
          { id: 'schedules', label: 'ক্লাসের রুটিন', icon: Calendar, badge: null },
          { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell, badge: null },
          { id: 'messages', label: 'যোগাযোগ বার্তা', icon: MessageSquare, badge: unreadMessages > 0 ? unreadMessages : null },
          { id: 'settings', label: 'ওয়েবসাইট সেটিংস', icon: Settings, badge: null },
          { id: 'backup', label: 'ডাটাবেজ ব্যাকআপ', icon: Database, badge: null },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#064E3B] text-amber-200 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-emerald-50 hover:text-[#064E3B] border border-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-100 text-emerald-900'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs font-semibold text-stone-500">মোট আবেদন</span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#064E3B] mt-1 font-serif">
                {totalApplications}
              </h3>
              <p className="text-[11px] text-stone-400 mt-1">সর্বমোট নিবন্ধিত</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
              <span className="text-xs font-semibold text-amber-800">যাচাইাধীন নতুন আবেদন</span>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-700 mt-1 font-serif">
                {pendingApplications}
              </h3>
              <p className="text-[11px] text-amber-700 mt-1">দ্রুত যোগাযোগ আবশ্যক</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-200 bg-purple-50/30 shadow-xs">
              <span className="text-xs font-semibold text-purple-800">ক্লাস নির্ধারিত</span>
              <h3 className="text-2xl sm:text-3xl font-black text-purple-700 mt-1 font-serif">
                {trialScheduled}
              </h3>
              <p className="text-[11px] text-purple-600 mt-1">শিডিউল প্রস্তুত</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
              <span className="text-xs font-semibold text-emerald-800">অনুমোদিত ও সক্রিয়</span>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 font-serif">
                {approvedStudents}
              </h3>
              <p className="text-[11px] text-emerald-600 mt-1">নিয়মিত শিক্ষার্থী</p>
            </div>
          </div>

          {/* Recent Pending Applications Quick Table */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                  সর্বশেষ ভর্তি আবেদনসমূহ
                </h3>
                <p className="text-xs text-stone-500">নতুন শিক্ষার্থীদের সাথে যোগাযোগ করে ক্লাসের শিডিউল নির্ধারণ করুন</p>
              </div>
              <button
                onClick={() => setActiveTab('admissions')}
                className="text-xs font-bold text-emerald-800 hover:underline"
              >
                সব আবেদন দেখুন ({totalApplications})
              </button>
            </div>

            <div className="overflow-x-auto">
              {db.admissions.length === 0 ? (
                <div className="text-center py-10 px-4 text-stone-500 bg-stone-50/50 rounded-xl border border-dashed border-stone-200">
                  <GraduationCap className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                  <p className="font-semibold text-sm text-stone-700">বর্তমানে কোনো নতুন ভর্তি আবেদন জমা পড়েনি</p>
                  <p className="text-xs text-stone-500 mt-1">শিক্ষার্থীরা ওয়েবসাইটে ভর্তি ফর্ম পূরণ করলে তা এখানে স্বয়ংক্রিয়ভাবে প্রদর্শিত হবে।</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 font-semibold bg-stone-50">
                      <th className="py-2.5 px-3">আইডি</th>
                      <th className="py-2.5 px-3">শিক্ষার্থী</th>
                      <th className="py-2.5 px-3">কোর্স</th>
                      <th className="py-2.5 px-3">মোবাইল</th>
                      <th className="py-2.5 px-3">ক্লাসের সময়</th>
                      <th className="py-2.5 px-3">স্ট্যাটাস</th>
                      <th className="py-2.5 px-3 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {db.admissions.slice(0, 5).map(app => (
                      <tr key={app.id} className="hover:bg-stone-50/80">
                        <td className="py-3 px-3 font-mono font-bold text-emerald-900">{app.id}</td>
                        <td className="py-3 px-3 font-semibold text-stone-900 font-serif">{app.studentName}</td>
                        <td className="py-3 px-3 text-stone-700">{app.courseTitle}</td>
                        <td className="py-3 px-3 text-stone-700">{app.phone}</td>
                        <td className="py-3 px-3 text-stone-600">{app.preferredTime}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.status === 'pending' ? 'bg-amber-100 text-amber-900' :
                            app.status === 'trial_scheduled' ? 'bg-purple-100 text-purple-900' :
                            app.status === 'approved' ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-100 text-stone-800'
                          }`}>
                            {app.status === 'pending' ? 'যাচাইাধীন' :
                             app.status === 'trial_scheduled' ? 'ক্লাস নির্ধারিত' :
                             app.status === 'approved' ? 'অনুমোদিত' : app.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedAdmission(app);
                              setActiveTab('admissions');
                            }}
                            className="px-2.5 py-1 rounded bg-[#064E3B] text-white font-bold text-[11px] hover:bg-[#043B2C]"
                          >
                            পরিচালনা
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. ADMISSIONS TAB */}
      {activeTab === 'admissions' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-stone-500" />
              <select
                value={admissionFilter}
                onChange={(e) => setAdmissionFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none"
              >
                <option value="all">সকল আবেদন ({db.admissions.length})</option>
                <option value="pending">যাচাইাধীন (Pending)</option>
                <option value="trial_scheduled">ক্লাস নির্ধারিত (Class Scheduled)</option>
                <option value="approved">অনুমোদিত (Approved)</option>
                <option value="enrolled">সক্রিয় শিক্ষার্থী (Enrolled)</option>
                <option value="rejected">বাতিল (Rejected)</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={admissionSearch}
                onChange={(e) => setAdmissionSearch(e.target.value)}
                placeholder="নাম, ফোন বা আইডি দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Admissions Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              {filteredAdmissions.length === 0 ? (
                <div className="text-center py-12 px-4 text-stone-500 bg-stone-50/50">
                  <GraduationCap className="w-12 h-12 text-stone-300 mx-auto mb-2" />
                  <p className="font-semibold text-sm text-stone-700">কোনো ভর্তি আবেদন পাওয়া যায়নি</p>
                  <p className="text-xs text-stone-400 mt-1">
                    {admissionSearch ? 'অনুসন্ধানের সাথে মিল পাওয়া যায়নি।' : 'নতুন শিক্ষার্থীরা আবেদন করলে তা এখানে প্রদর্শিত হবে।'}
                  </p>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-600 font-bold bg-stone-50">
                      <th className="py-3 px-3">আইডি ও তারিখ</th>
                      <th className="py-3 px-3">শিক্ষার্থী ও অভিভাবক</th>
                      <th className="py-3 px-3">কোর্স ও ধরন</th>
                      <th className="py-3 px-3">মোবাইল ও ইমেইল</th>
                      <th className="py-3 px-3">বর্তমান অবস্থা</th>
                      <th className="py-3 px-3">শিক্ষক ও ক্লাসের সময়</th>
                      <th className="py-3 px-3 text-right">কার্যক্রম</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredAdmissions.map(app => (
                      <tr key={app.id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-emerald-900 block">{app.id}</span>
                          <span className="text-[10px] text-stone-400">{new Date(app.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3 px-3">
                          <strong className="text-stone-900 text-sm font-serif block">{app.studentName}</strong>
                          {app.guardianName && <span className="text-[11px] text-stone-500">অভিভাবক: {app.guardianName}</span>}
                          <span className="text-[10px] block text-stone-500">{app.age} • {app.gender === 'female' ? 'মহিলা' : 'পুরুষ'} • {app.countryCity}</span>
                        </td>
                        <td className="py-3 px-3">
                          <strong className="text-stone-800 block">{app.courseTitle}</strong>
                          <span className="text-[11px] text-amber-800">{app.classType === 'one-on-one' ? '১-অন-১ ক্লাস' : 'গ্রুপ ব্যাচ'}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-stone-900 block">{app.phone}</span>
                          <span className="text-stone-500 text-[10px]">{app.email || 'ইমেইল নেই'}</span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateStatus(app, e.target.value as any)}
                            className="px-2 py-1 rounded-lg border border-stone-300 font-bold text-[11px] focus:outline-none"
                          >
                            <option value="pending">যাচাইাধীন</option>
                            <option value="reviewing">পর্যালোচনাধীন</option>
                            <option value="trial_scheduled">ক্লাস নির্ধারিত</option>
                            <option value="approved">অনুমোদিত</option>
                            <option value="enrolled">ক্লাসে সক্রিয়</option>
                            <option value="rejected">বাতিল</option>
                          </select>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-stone-800 font-medium block">
                            {app.assignedTeacher || 'অ্যাসাইন হয়নি'}
                          </span>
                          {app.trialDate && (
                            <span className="text-[10px] text-purple-800 block font-semibold">
                              {app.trialDate} ({app.trialTime || ''})
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-1">
                          <button
                            onClick={() => setSelectedAdmission(app)}
                            className="p-1.5 rounded-lg bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors"
                            title="সম্পূর্ণ বিস্তারিত ও ক্লাসের লিংক এডিট"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`আপনি কি সত্যিই ${app.studentName}-এর আবেদন মুছে ফেলতে চান?`)) {
                                await deleteAdmission(app.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Admission Detail & Trial Assignment Drawer / Modal */}
          {selectedAdmission && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border-2 border-emerald-700 max-h-[90vh] overflow-y-auto space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                      শিক্ষার্থী ও ক্লাস শিডিউল ব্যবস্থাপনা
                    </h3>
                    <p className="text-xs text-stone-500 font-mono">{selectedAdmission.id}</p>
                  </div>
                  <button onClick={() => setSelectedAdmission(null)} className="p-1 text-stone-400 hover:text-stone-800">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveAdmissionDetails} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border">
                    <div>
                      <span className="text-stone-500 block">শিক্ষার্থীর নাম:</span>
                      <strong className="text-stone-900 text-sm font-serif">{selectedAdmission.studentName}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">মোবাইল:</span>
                      <strong className="text-stone-900">{selectedAdmission.phone}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">কোর্স:</span>
                      <strong className="text-stone-900">{selectedAdmission.courseTitle}</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">বর্তমান স্তর:</span>
                      <span className="text-stone-800">{selectedAdmission.currentLevel}</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">ভর্তি অবস্থা / স্ট্যাটাস:</label>
                    <select
                      value={selectedAdmission.status}
                      onChange={(e) => setSelectedAdmission({ ...selectedAdmission, status: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    >
                      <option value="pending">আবেদন গৃহীত (যাচাইাধীন)</option>
                      <option value="reviewing">পর্যালোচনাধীন</option>
                      <option value="trial_scheduled">ক্লাসের সময় ও শিক্ষক নির্ধারিত</option>
                      <option value="approved">ভর্তি অনুমোদিত</option>
                      <option value="enrolled">নিয়মিত ক্লাসে সক্রিয়</option>
                      <option value="rejected">বাতিল</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">অ্যাসাইনকৃত শিক্ষক:</label>
                      <select
                        value={selectedAdmission.assignedTeacher || ''}
                        onChange={(e) => setSelectedAdmission({ ...selectedAdmission, assignedTeacher: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      >
                        <option value="">শিক্ষক নির্বাচন করুন</option>
                        {db.teachers.map(t => (
                          <option key={t.id} value={t.nameBn}>
                            {t.nameBn} ({t.gender === 'female' ? 'মহিলা' : 'উস্তাদ'})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-bold block mb-1">ক্লাসের তারিখ ও সময়:</label>
                      <input
                        type="text"
                        value={selectedAdmission.trialDate || ''}
                        onChange={(e) => setSelectedAdmission({ ...selectedAdmission, trialDate: e.target.value })}
                        placeholder="যেমন: 2026-10-18, বিকাল ৫:০০"
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">অনলাইন লাইভ ক্লাসরুম লিংক (Google Meet / Zoom):</label>
                    <input
                      type="url"
                      value={selectedAdmission.trialMeetingLink || ''}
                      onChange={(e) => setSelectedAdmission({ ...selectedAdmission, trialMeetingLink: e.target.value })}
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">অ্যাডমিন নোট / নির্দেশনা:</label>
                    <textarea
                      rows={3}
                      value={selectedAdmission.adminNotes || ''}
                      onChange={(e) => setSelectedAdmission({ ...selectedAdmission, adminNotes: e.target.value })}
                      placeholder="শিক্ষার্থীর উদ্দেশ্যে কোনো বিশেষ বার্তা..."
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  {saveSuccessMsg && (
                    <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold text-center">
                      {saveSuccessMsg}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#043B2C] cursor-pointer"
                    >
                      আপডেট সংরক্ষণ করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAdmission(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs cursor-pointer"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. COURSES TAB */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-[#064E3B]">কোর্স ব্যবস্থাপনা</h3>
            <button
              onClick={() => {
                setIsNewCourse(true);
                setEditingCourse({
                  titleBn: '',
                  titleEn: '',
                  slug: '',
                  category: 'basic',
                  shortDescBn: '',
                  shortDescEn: '',
                  fullDescBn: '',
                  durationBn: '৩ মাস',
                  classesPerWeekBn: 'সপ্তাহে ৩ দিন',
                  classDurationBn: '৪০ মিনিট',
                  classTypeBn: '১-অন-১ ওয়ান টু ওয়ান',
                  monthlyFeeBn: '১,২০০ ৳ / মাস',
                  admissionFeeBn: 'ফ্রি',
                  teacherNameBn: 'অভিজ্ঞ ক্বারী সাহেব',
                  suitableForBn: 'সকলের জন্য',
                  curriculumBn: ['আরবি হরফের বিশুদ্ধ উচ্চারণ', 'মাখরাজ ও সিফাত'],
                  featuresBn: ['ওয়ান-টু-ওয়ান ক্লাস', 'ডিজিটাল স্ক্রিন শেয়ারিং'],
                  isActive: true,
                  featured: true
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#043B2C] cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>নতুন কোর্স যোগ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {db.courses.map(course => (
              <div key={course.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                      {course.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      course.isActive ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {course.isActive ? 'সক্রিয়' : 'গোপন'}
                    </span>
                  </div>
                  <h4 className="font-bold font-serif text-stone-900 text-base">{course.titleBn}</h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">{course.shortDescBn}</p>

                  <div className="mt-3 pt-3 border-t text-xs space-y-1 text-stone-500">
                    <div>মেয়াদ: <strong className="text-stone-800">{course.durationBn}</strong></div>
                    <div>হাদিয়া: <strong className="text-emerald-900">{course.monthlyFeeBn}</strong></div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setIsNewCourse(false);
                      setEditingCourse(course);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900 hover:bg-emerald-100 cursor-pointer"
                    title="সম্পাদনা"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`আপনি কি সত্যিই '${course.titleBn}' কোর্সটি মুছে ফেলতে চান?`)) {
                        await deleteCourse(course.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Course Edit Modal */}
          {editingCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border-2 border-emerald-700 max-h-[90vh] overflow-y-auto space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                    {isNewCourse ? 'নতুন কোর্স যুক্ত করুন' : 'কোর্স সম্পাদনা করুন'}
                  </h3>
                  <button onClick={() => setEditingCourse(null)} className="p-1 text-stone-400 hover:text-stone-800">✕</button>
                </div>

                <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold block mb-1">কোর্সের নাম (বাংলা):</label>
                    <input
                      type="text"
                      required
                      value={editingCourse.titleBn || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, titleBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">ক্যাটেগরি:</label>
                      <select
                        value={editingCourse.category || 'basic'}
                        onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      >
                        <option value="basic">নূরানি ও বেসিক</option>
                        <option value="tajweed">সহিহ তিলাওয়াত ও তাজবিদ</option>
                        <option value="hifz">হিফজুল কুরআন</option>
                        <option value="special">নারী, শিশু ও প্রবাসী স্পেশাল</option>
                        <option value="general">মাসনুন দোয়া ও ইসলামিক শিক্ষা</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold block mb-1">মাসিক হাদিয়া/ফি:</label>
                      <input
                        type="text"
                        value={editingCourse.monthlyFeeBn || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, monthlyFeeBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">সংক্ষিপ্ত বিবরণ:</label>
                    <textarea
                      rows={2}
                      value={editingCourse.shortDescBn || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, shortDescBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">পূর্ণাঙ্গ বিবরণ:</label>
                    <textarea
                      rows={3}
                      value={editingCourse.fullDescBn || ''}
                      onChange={(e) => setEditingCourse({ ...editingCourse, fullDescBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">কোর্সের মেয়াদ:</label>
                      <input
                        type="text"
                        value={editingCourse.durationBn || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, durationBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-bold block mb-1">সাপ্তাহিক ক্লাস:</label>
                      <input
                        type="text"
                        value={editingCourse.classesPerWeekBn || ''}
                        onChange={(e) => setEditingCourse({ ...editingCourse, classesPerWeekBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isActiveCourse"
                      checked={editingCourse.isActive !== false}
                      onChange={(e) => setEditingCourse({ ...editingCourse, isActive: e.target.checked })}
                    />
                    <label htmlFor="isActiveCourse" className="font-semibold text-stone-800">
                      ওয়েবসাইটে প্রকাশ্যে প্রদর্শন করুন (Active)
                    </label>
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold hover:bg-[#043B2C]"
                    >
                      সংরক্ষণ করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCourse(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. TEACHERS TAB */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-[#064E3B]">শিক্ষকমণ্ডলী পরিচালনা</h3>
            <button
              onClick={() => {
                setIsNewTeacher(true);
                setEditingTeacher({
                  nameBn: '',
                  nameEn: '',
                  designationBn: 'প্রভাষক ও উস্তাদ',
                  qualificationBn: 'দাওরায়ে হাদিস / হাফেজে কুরআন',
                  specializationBn: 'সহিহ কুরআন ও তাজবিদ',
                  experienceBn: '৫+ বছর',
                  gender: 'male',
                  bioBn: 'আন্তরিক যত্নে কুরআন শিক্ষাদানে নিবেদিতপ্রাণ।',
                  isActive: true
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#043B2C] cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>নতুন শিক্ষক যোগ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {db.teachers.map(teacher => (
              <div key={teacher.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      teacher.gender === 'female' ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {teacher.gender === 'female' ? 'মহিলা শিক্ষিকা' : 'উস্তাদ'}
                    </span>
                    <span className="text-[11px] text-stone-500">{teacher.experienceBn}</span>
                  </div>
                  <h4 className="font-bold font-serif text-stone-900 text-base">{teacher.nameBn}</h4>
                  <p className="text-xs text-amber-800 font-semibold">{teacher.designationBn}</p>
                  <p className="text-xs text-stone-600 mt-2">{teacher.qualificationBn}</p>
                  <p className="text-xs text-emerald-900 mt-1">বিশেষত্ব: {teacher.specializationBn}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setIsNewTeacher(false);
                      setEditingTeacher(teacher);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm(`আপনি কি সত্যিই ${teacher.nameBn}-কে মুছে ফেলতে চান?`)) {
                        await deleteTeacher(teacher.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Teacher Edit Modal */}
          {editingTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-700 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                    {isNewTeacher ? 'নতুন শিক্ষক যোগ করুন' : 'শিক্ষকের তথ্য সম্পাদনা'}
                  </h3>
                  <button onClick={() => setEditingTeacher(null)} className="p-1 text-stone-400 hover:text-stone-800">✕</button>
                </div>

                <form onSubmit={handleSaveTeacher} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold block mb-1">শিক্ষকের নাম (বাংলা):</label>
                    <input
                      type="text"
                      required
                      value={editingTeacher.nameBn || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, nameBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">পদবী:</label>
                      <input
                        type="text"
                        value={editingTeacher.designationBn || ''}
                        onChange={(e) => setEditingTeacher({ ...editingTeacher, designationBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">লিঙ্গ:</label>
                      <select
                        value={editingTeacher.gender || 'male'}
                        onChange={(e) => setEditingTeacher({ ...editingTeacher, gender: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      >
                        <option value="male">পুরুষ উস্তাদ</option>
                        <option value="female">মহিলা শিক্ষিকা</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">শিক্ষাগত যোগ্যতা:</label>
                    <input
                      type="text"
                      value={editingTeacher.qualificationBn || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, qualificationBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">বিশেষজ্ঞতা ও অভিজ্ঞতা:</label>
                    <input
                      type="text"
                      value={editingTeacher.specializationBn || ''}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, specializationBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold hover:bg-[#043B2C]"
                    >
                      সংরক্ষণ করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTeacher(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. SCHEDULES TAB */}
      {activeTab === 'schedules' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-[#064E3B]">ক্লাসের সময়সূচি ও লাইভ লিংক</h3>
            <button
              onClick={() => {
                setIsNewSchedule(true);
                setEditingSchedule({
                  courseId: db.courses[0]?.id || '',
                  courseNameBn: db.courses[0]?.titleBn || 'নূরানি ক্লাস',
                  teacherNameBn: db.teachers[0]?.nameBn || 'উস্তাদ',
                  daysBn: 'শনি, সোম, বুধ',
                  timeSlotBn: 'বিকাল ৫:০০ - ৫:৪০',
                  targetGroupBn: 'সকল শিক্ষার্থী',
                  liveClassLink: 'https://meet.google.com/fsd-sample',
                  isActive: true
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#043B2C]"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>নতুন শিডিউল যোগ করুন</span>
            </button>
          </div>

          <div className="space-y-3">
            {db.schedules.map(sched => (
              <div key={sched.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold font-serif text-stone-900 text-sm">{sched.courseNameBn}</h4>
                  <div className="flex flex-wrap gap-3 text-xs text-stone-600 mt-1">
                    <span>বার: <strong>{sched.daysBn}</strong></span>
                    <span>সময়: <strong>{sched.timeSlotBn}</strong></span>
                    <span>শিক্ষক: <strong>{sched.teacherNameBn}</strong></span>
                  </div>
                  {sched.liveClassLink && (
                    <a
                      href={sched.liveClassLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-emerald-800 hover:underline mt-1 block font-mono"
                    >
                      {sched.liveClassLink}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setIsNewSchedule(false);
                      setEditingSchedule(sched);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('শিডিউলটি মুছে ফেলতে চান?')) {
                        await deleteSchedule(sched.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Edit Modal */}
          {editingSchedule && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-700 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                    {isNewSchedule ? 'নতুন শিডিউল যোগ করুন' : 'শিডিউল সম্পাদনা'}
                  </h3>
                  <button onClick={() => setEditingSchedule(null)} className="p-1 text-stone-400 hover:text-stone-800">✕</button>
                </div>

                <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold block mb-1">কোর্স বা ব্যাচের নাম:</label>
                    <input
                      type="text"
                      required
                      value={editingSchedule.courseNameBn || ''}
                      onChange={(e) => setEditingSchedule({ ...editingSchedule, courseNameBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold block mb-1">বার / দিন:</label>
                      <input
                        type="text"
                        value={editingSchedule.daysBn || ''}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, daysBn: e.target.value })}
                        placeholder="যেমন: শনি, সোম, বুধ"
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">সময়:</label>
                      <input
                        type="text"
                        value={editingSchedule.timeSlotBn || ''}
                        onChange={(e) => setEditingSchedule({ ...editingSchedule, timeSlotBn: e.target.value })}
                        placeholder="যেমন: বিকাল ৫:০০ - ৫:৪০"
                        className="w-full px-3 py-2 rounded-xl border bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1">শিক্ষক:</label>
                    <input
                      type="text"
                      value={editingSchedule.teacherNameBn || ''}
                      onChange={(e) => setEditingSchedule({ ...editingSchedule, teacherNameBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">লাইভ ক্লাসরুম লিংক (Google Meet / Zoom):</label>
                    <input
                      type="url"
                      value={editingSchedule.liveClassLink || ''}
                      onChange={(e) => setEditingSchedule({ ...editingSchedule, liveClassLink: e.target.value })}
                      placeholder="https://meet.google.com/..."
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold hover:bg-[#043B2C]"
                    >
                      সংরক্ষণ করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSchedule(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. NOTICES TAB */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-serif text-[#064E3B]">নোটিশ বোর্ড ব্যবস্থাপনা</h3>
            <button
              onClick={() => {
                setIsNewNotice(true);
                setEditingNotice({
                  titleBn: '',
                  contentBn: '',
                  dateBn: new Date().toLocaleDateString('bn-BD'),
                  isPinned: false,
                  targetAudience: 'all'
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#043B2C]"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>নতুন নোটিশ প্রকাশ করুন</span>
            </button>
          </div>

          <div className="space-y-4">
            {db.notices.map(notice => (
              <div key={notice.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {notice.isPinned && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                        পিন করা (জরুরি)
                      </span>
                    )}
                    <span className="text-[11px] text-stone-500">{notice.dateBn}</span>
                  </div>
                  <h4 className="font-bold font-serif text-stone-900 text-base">{notice.titleBn}</h4>
                  <p className="text-xs text-stone-700 mt-2 leading-relaxed">{notice.contentBn}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      setIsNewNotice(false);
                      setEditingNotice(notice);
                    }}
                    className="p-1.5 rounded-lg bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (confirm('নোটিশটি মুছে ফেলতে চান?')) {
                        await deleteNotice(notice.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Notice Edit Modal */}
          {editingNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-emerald-700 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-lg font-bold font-serif text-[#064E3B]">
                    {isNewNotice ? 'নতুন নোটিশ তৈরি করুন' : 'নোটিশ সম্পাদনা'}
                  </h3>
                  <button onClick={() => setEditingNotice(null)} className="p-1 text-stone-400 hover:text-stone-800">✕</button>
                </div>

                <form onSubmit={handleSaveNotice} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold block mb-1">নোটিশের শিরোনাম:</label>
                    <input
                      type="text"
                      required
                      value={editingNotice.titleBn || ''}
                      onChange={(e) => setEditingNotice({ ...editingNotice, titleBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">তারিখ:</label>
                    <input
                      type="text"
                      value={editingNotice.dateBn || ''}
                      onChange={(e) => setEditingNotice({ ...editingNotice, dateBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1">বিস্তারিত বিষয়বস্তু:</label>
                    <textarea
                      rows={4}
                      required
                      value={editingNotice.contentBn || ''}
                      onChange={(e) => setEditingNotice({ ...editingNotice, contentBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pinNotice"
                      checked={editingNotice.isPinned || false}
                      onChange={(e) => setEditingNotice({ ...editingNotice, isPinned: e.target.checked })}
                    />
                    <label htmlFor="pinNotice" className="font-semibold text-stone-800">
                      উপরে পিন করে রাখুন (গুরুত্বপূর্ণ ঘোষণা)
                    </label>
                  </div>

                  <div className="flex gap-2 pt-3 border-t">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold hover:bg-[#043B2C]"
                    >
                      প্রকাশ করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingNotice(null)}
                      className="px-4 py-2.5 rounded-xl border border-stone-300"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. MESSAGES INBOX TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-serif text-[#064E3B]">
            যোগাযোগ বার্তা ইনবক্স ({db.messages.length})
          </h3>

          <div className="space-y-4">
            {db.messages.length === 0 ? (
              <div className="p-8 text-center text-stone-500 bg-white rounded-2xl border">
                কোনো বার্তা নেই।
              </div>
            ) : (
              db.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    msg.isRead ? 'bg-white border-stone-200' : 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-serif text-stone-900">{msg.name}</strong>
                        {!msg.isRead && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-emerald-950">
                            নতুন
                          </span>
                        )}
                        <span className="text-[11px] text-stone-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-stone-600 mt-1">
                        মোবাইল: <a href={`tel:${msg.phone}`} className="font-bold text-emerald-800 hover:underline">{msg.phone}</a>
                        {msg.email && <span> • ইমেইল: <a href={`mailto:${msg.email}`} className="text-emerald-800 hover:underline">{msg.email}</a></span>}
                      </div>
                      <h5 className="text-xs font-bold text-stone-800 mt-2 font-serif">{msg.subject}</h5>
                      <p className="text-xs text-stone-700 mt-1 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {!msg.isRead && (
                        <button
                          onClick={() => markMessageAsRead(msg.id)}
                          className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-semibold"
                          title="পঠিত হিসেবে চিহ্নিত করুন"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={async () => {
                          if (confirm('বার্তাটি মুছে ফেলতে চান?')) {
                            await deleteMessage(msg.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 8. WEBSITE SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#064E3B]">
              ওয়েবসাইট পরিচিতি ও যোগাযোগের সেটিংস
            </h3>
            <p className="text-xs text-stone-500">
              এখান থেকে প্রতিষ্ঠানের নাম, ফোন, ইমেইল, ব্যানার ও ঠিকানা পরিবর্তন করতে পারবেন।
            </p>
          </div>

          {settingsSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>ওয়েবসাইট সেটিংস সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">প্রতিষ্ঠানের নাম (বাংলা):</label>
                <input
                  type="text"
                  required
                  value={settingsForm.academyNameBn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, academyNameBn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">স্লোগান (বাংলা ও ইংরেজি):</label>
                <input
                  type="text"
                  value={settingsForm.sloganEn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, sloganEn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">অফিসিয়াল মোবাইল নম্বর:</label>
                <input
                  type="text"
                  required
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">অফিসিয়াল ইমেইল:</label>
                <input
                  type="email"
                  required
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold block mb-1">হোয়াটসঅ্যাপ নম্বর:</label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">হেডার অ্যানাউন্সমেন্ট টেক্সট:</label>
                <input
                  type="text"
                  value={settingsForm.announcementBn}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementBn: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block mb-1">ব্যানার সাবটাইটেল:</label>
              <textarea
                rows={2}
                value={settingsForm.bannerSubtitleBn}
                onChange={(e) => setSettingsForm({ ...settingsForm, bannerSubtitleBn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
              />
            </div>

            <div>
              <label className="font-bold block mb-1">ঠিকানা ও উপস্থিতি:</label>
              <input
                type="text"
                value={settingsForm.addressBn}
                onChange={(e) => setSettingsForm({ ...settingsForm, addressBn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl font-bold text-white bg-[#064E3B] hover:bg-[#043B2C] text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4 text-amber-300" />
              <span>সেটিংস সংরক্ষণ করুন</span>
            </button>
          </form>

          {/* Admin Password Change Box */}
          <div className="pt-6 border-t border-stone-200">
            <h4 className="text-base font-bold font-serif text-[#064E3B] mb-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-800" />
              <span>অ্যাডমিন নিরাপত্তা ও পাসওয়ার্ড পরিবর্তন</span>
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              অ্যাডমিন ড্যাশবোর্ডের পূর্ণাঙ্গ নিরাপত্তা নিশ্চিত করতে প্রয়োজনমতো পাসওয়ার্ড পরিবর্তন করুন।
            </p>

            {passwordChangeStatus && (
              <div className={`p-3 rounded-xl text-xs mb-4 flex items-center gap-2 ${
                passwordChangeStatus.type === 'success' 
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800' 
                  : 'bg-red-50 border border-red-300 text-red-700'
              }`}>
                {passwordChangeStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <span>{passwordChangeStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-lg">
              <div>
                <label className="font-bold block mb-1 text-xs">বর্তমান পাসওয়ার্ড:</label>
                <input
                  type="password"
                  required
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  placeholder="বর্তমান পাসওয়ার্ড দিন"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1 text-xs">নতুন পাসওয়ার্ড:</label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="ন্যূনতম ৬ অক্ষর"
                    autoComplete="new-password"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-xs">নতুন পাসওয়ার্ড নিশ্চিত করুন:</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPasswordInput}
                    onChange={(e) => setConfirmNewPasswordInput(e.target.value)}
                    placeholder="পুনরায় লিখুন"
                    autoComplete="new-password"
                    className="w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="py-2.5 px-5 rounded-xl font-bold text-white bg-emerald-800 hover:bg-emerald-900 text-xs flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-60"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isChangingPassword ? 'পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন সম্পন্ন করুন'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 9. DATABASE BACKUP & RESTORE TAB */}
      {activeTab === 'backup' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-xl font-bold font-serif text-[#064E3B]">
              ডাটাবেজ ব্যাকআপ ও রিস্টোর (JSON Export / Import)
            </h3>
            <p className="text-xs text-stone-500">
              সমস্ত কোর্স, আবেদন, শিক্ষক, নোটিশ এবং মেসেজ এক ক্লিকে ডাউনলোড বা রিস্টোর করুন।
            </p>
          </div>

          {backupFeedback && (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900">
              {backupFeedback}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Export */}
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-700" />
                <span>সম্পূর্ণ ব্যাকআপ ডাউনলোড (JSON Export)</span>
              </h4>
              <p className="text-xs text-stone-600">
                ডাটাবেজের সব তথ্য আপনার কম্পিউটারে নিরাপদ ফাইল হিসেবে সেভ করে রাখুন।
              </p>
              <button
                onClick={handleDownloadBackup}
                className="px-4 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>ব্যাকআপ ফাইল ডাউনলোড করুন (.json)</span>
              </button>
            </div>

            {/* Import */}
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-700" />
                <span>ব্যাকআপ থেকে ডাটাবেজ রিস্টোর (JSON Import)</span>
              </h4>
              <p className="text-xs text-stone-600">
                পূর্বে সংরক্ষিত কোনো ব্যাকআপ JSON কোড এখানে পেস্ট করে রিস্টোর করুন:
              </p>
              <textarea
                rows={3}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"siteSettings": {...}, "courses": [...]}'
                className="w-full p-2 rounded-lg border text-xs font-mono bg-white"
              />
              <button
                onClick={handleImportJson}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>ডাটাবেজ রিস্টোর করুন</span>
              </button>
            </div>
          </div>

          {/* Reset to Factory Defaults */}
          <div className="pt-4 border-t flex items-center justify-between">
            <span className="text-xs text-stone-500">
              প্রয়োজনে প্রাথমিক ডিফল্ট তথ্যে ফিরে যেতে পারেন:
            </span>
            <button
              onClick={async () => {
                if (confirm('আপনি কি নিশ্চিত যে ডাটাবেজ প্রাথমিক অবস্থায় রিসেট করতে চান?')) {
                  await resetDatabaseToDefault();
                  setBackupFeedback('ডাটাবেজ প্রাথমিক তথ্যে রিসেট করা হয়েছে।');
                }
              }}
              className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ডিফল্ট ডেটায় রিসেট</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
