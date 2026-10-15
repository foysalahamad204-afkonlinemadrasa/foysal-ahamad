export type Language = 'bn' | 'en';

export type ApplicationStatus = 'pending' | 'reviewing' | 'trial_scheduled' | 'approved' | 'enrolled' | 'rejected';

export interface Course {
  id: string;
  titleBn: string;
  titleEn: string;
  slug: string;
  category: 'basic' | 'hifz' | 'tajweed' | 'general' | 'special';
  shortDescBn: string;
  shortDescEn: string;
  fullDescBn: string;
  durationBn: string;
  classesPerWeekBn: string;
  classDurationBn: string;
  classTypeBn: string; // 1-on-1 / Group
  monthlyFeeBn: string;
  admissionFeeBn: string;
  teacherNameBn: string;
  suitableForBn: string;
  curriculumBn: string[];
  featuresBn: string[];
  isActive: boolean;
  featured: boolean;
}

export interface Teacher {
  id: string;
  nameBn: string;
  nameEn: string;
  designationBn: string;
  qualificationBn: string;
  specializationBn: string;
  experienceBn: string;
  gender: 'male' | 'female';
  bioBn: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface AdmissionApplication {
  id: string; // FSDQ-2026-XXXX
  studentName: string;
  guardianName?: string;
  phone: string;
  email?: string;
  age: string;
  gender: 'male' | 'female';
  countryCity: string;
  courseId: string;
  courseTitle: string;
  currentLevel: string;
  preferredTime: string;
  classType: 'one-on-one' | 'small-group';
  additionalNotes?: string;
  status: ApplicationStatus;
  adminNotes?: string;
  assignedTeacher?: string;
  trialDate?: string;
  trialTime?: string;
  trialMeetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  titleBn: string;
  titleEn?: string;
  contentBn: string;
  dateBn: string;
  isPinned: boolean;
  targetAudience: 'all' | 'students' | 'guardians';
  createdAt: string;
}

export interface ClassSchedule {
  id: string;
  courseId: string;
  courseNameBn: string;
  teacherNameBn: string;
  daysBn: string;
  timeSlotBn: string;
  targetGroupBn: string;
  liveClassLink?: string;
  isActive: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteSettings {
  academyNameBn: string;
  academyNameEn: string;
  sloganBn: string;
  sloganEn: string;
  phone: string;
  email: string;
  whatsapp: string;
  addressBn: string;
  announcementBn: string;
  facebookUrl: string;
  youtubeUrl: string;
  bannerSubtitleBn: string;
  adminPasswordHash?: string;
}

export interface AcademyDatabase {
  siteSettings: SiteSettings;
  courses: Course[];
  teachers: Teacher[];
  admissions: AdmissionApplication[];
  notices: Notice[];
  schedules: ClassSchedule[];
  messages: ContactMessage[];
}
