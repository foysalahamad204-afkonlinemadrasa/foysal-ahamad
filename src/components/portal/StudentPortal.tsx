import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  GraduationCap, 
  Calendar, 
  Clock, 
  Video, 
  User, 
  Bell, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  LogOut, 
  Edit3, 
  Save, 
  AlertCircle,
  BookOpen,
  Printer,
  Download,
  Loader2
} from 'lucide-react';
import { AdmissionApplication, Course, Notice } from '../../types';
import { useAcademy } from '../../context/AcademyContext';
import { PrintableReceipt } from '../admission/PrintableReceipt';
import { downloadAdmissionPdf } from '../../utils/pdfGenerator';

interface StudentPortalProps {
  student: AdmissionApplication;
  onLogout: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  student,
  onLogout,
}) => {
  const { db, updateAdmission } = useAcademy();

  const [activeTab, setActiveTab] = useState<'overview' | 'routine' | 'notices' | 'profile' | 'fees'>('overview');

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profilePhone, setProfilePhone] = useState(student.phone);
  const [profileEmail, setProfileEmail] = useState(student.email || '');
  const [profileTime, setProfileTime] = useState(student.preferredTime);
  const [profileSaved, setProfileSaved] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const course = db.courses.find(c => c.id === student.courseId);

  // Student specific or general notices
  const studentNotices = db.notices.filter(n => n.targetAudience === 'all' || n.targetAudience === 'students');

  // Schedules matching student's course
  const studentSchedules = db.schedules.filter(s => s.courseId === student.courseId || s.isActive);

  const handleSaveProfile = async () => {
    await updateAdmission({
      ...student,
      phone: profilePhone,
      email: profileEmail,
      preferredTime: profileTime,
    });
    setIsEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      await downloadAdmissionPdf(`portal-receipt-${student.id}`, student);
    } catch (err) {
      console.error('PDF error, falling back to print:', err);
      handlePrint();
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStatusDisplay = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'pending':
        return { label: 'আবেদন গৃহীত (প্রাথমিক যাচাইাধীন)', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'trial_scheduled':
        return { label: 'ক্লাসের সময় ও শিক্ষক নির্ধারিত হয়েছে', color: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'approved':
        return { label: 'ভর্তি অনুমোদিত হয়েছে', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'enrolled':
        return { label: 'নিয়মিত ক্লাসে সক্রিয়', color: 'bg-green-100 text-green-900 border-green-300' };
      case 'rejected':
        return { label: 'আবেদন সাময়িকভাবে বাতিল', color: 'bg-red-100 text-red-900 border-red-300' };
      default:
        return { label: 'পর্যালোচনাধীন', color: 'bg-stone-100 text-stone-800 border-stone-300' };
    }
  };

  const statusInfo = getStatusDisplay(student.status);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#022C22] via-[#064E3B] to-[#043B2C] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-amber-400 mb-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center font-serif text-2xl font-black shadow-md border-2 border-amber-300">
              {student.studentName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-emerald-900/80 text-amber-300 px-2 py-0.5 rounded border border-emerald-700">
                  {student.id}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
                {student.studentName}
              </h1>
              <p className="text-xs text-amber-200 mt-0.5">
                কোর্স: {student.courseTitle} ({student.classType === 'one-on-one' ? '১-অন-১ ওয়ান টু ওয়ান' : 'গ্রুপ ব্যাচ'})
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/80 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer border border-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-stone-200 gap-2 mb-6 overflow-x-auto pb-1">
        {[
          { id: 'overview', label: 'ড্যাশবোর্ড ও বিবরণ', icon: GraduationCap },
          { id: 'routine', label: 'ক্লাসের সময়সূচি ও লিংক', icon: Calendar },
          { id: 'notices', label: 'নোটিশ বোর্ড', icon: Bell },
          { id: 'fees', label: 'ফি ও পেমেন্ট তথ্য', icon: CreditCard },
          { id: 'profile', label: 'প্রোফাইল সম্পাদনা', icon: User },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#064E3B] text-amber-200 shadow-sm'
                  : 'bg-white text-stone-600 hover:bg-emerald-50 hover:text-[#064E3B] border border-stone-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Status Box */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-bold font-serif text-lg text-[#064E3B] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>ভর্তি ও ক্লাসের বর্তমান অবস্থা</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 block">নির্ধারিত শিক্ষক:</span>
                <strong className="text-stone-900 text-sm font-serif">
                  {student.assignedTeacher || 'শিগগিরই নির্ধারণ করা হবে'}
                </strong>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 block">ক্লাসের সময়সূচি:</span>
                <strong className="text-stone-900 text-sm">
                  {student.trialDate ? `${student.trialDate} (${student.trialTime || ''})` : student.preferredTime}
                </strong>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 block">কুরআন শিক্ষার স্তর:</span>
                <strong className="text-stone-900 text-sm">
                  {student.currentLevel}
                </strong>
              </div>
            </div>

            {/* Live Class Link */}
            {student.trialMeetingLink ? (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Video className="w-6 h-6 text-emerald-700" />
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">আপনার অনলাইন ক্লাসরুম প্রস্তুত!</h4>
                    <p className="text-xs text-emerald-800">নির্ধারিত সময়ে নিচে লিঙ্কে ক্লিক করে সরাসরি ক্লাসে যুক্ত হোন।</p>
                  </div>
                </div>
                <a
                  href={student.trialMeetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#064E3B] text-amber-200 font-bold text-xs hover:bg-[#043B2C] shadow-sm transition-all"
                >
                  ক্লাসে জয়েন করুন
                </a>
              </div>
            ) : (
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                <span>আমাদের প্রতিনিধি আপনার নম্বরে কল বা মেসেজ দিয়ে ক্লাস লিংক ও সময় চূড়ান্ত করবেন।</span>
              </div>
            )}

            {student.adminNotes && (
              <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-700">
                <strong>শিক্ষক ও একাডেমির নির্দেশনা:</strong> {student.adminNotes}
              </div>
            )}

            {/* Official Admission Document & Receipt */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#064E3B] text-amber-300 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-serif">অফিসিয়াল ভর্তি আবেদনপত্র ও রসিদ</h4>
                  <p className="text-xs text-stone-600">আইডি: <strong className="font-mono">{student.id}</strong> • ভর্তি নিশ্চিতকরণ কপি</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                >
                  <Printer className="w-4 h-4 text-[#064E3B]" />
                  <span>প্রিন্ট করুন</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg border border-amber-400 bg-amber-400 hover:bg-amber-500 text-stone-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60 active:scale-98"
                >
                  {isDownloadingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>PDF হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>PDF ডাউনলোড</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enrolled Course Details */}
          {course && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <h3 className="font-bold font-serif text-lg text-[#064E3B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <span>আপনার পাঠ্যক্রম সিলেবাস: {course.titleBn}</span>
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {course.fullDescBn}
              </p>

              {course.curriculumBn && course.curriculumBn.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-stone-800 mb-2">এই কোর্সে যা যা শেখানো হবে:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {course.curriculumBn.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Routine */}
      {activeTab === 'routine' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold font-serif text-lg text-[#064E3B]">
            অনলাইন ক্লাসের সময়সূচি ও রুটিন
          </h3>
          <p className="text-xs text-stone-600">
            আপনার পছন্দের সময় অনুযায়ী এবং একাডেমির নির্ধারিত ব্যাচ শিডিউল নিচে প্রদর্শিত হলো:
          </p>

          <div className="space-y-3">
            {studentSchedules.map(sched => (
              <div key={sched.id} className="p-4 rounded-xl border border-stone-200 bg-[#FAF7F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 font-serif">{sched.courseNameBn}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mt-1">
                    <span>বার: <strong>{sched.daysBn}</strong></span>
                    <span>সময়: <strong>{sched.timeSlotBn}</strong></span>
                    <span>শিক্ষক: <strong>{sched.teacherNameBn}</strong></span>
                  </div>
                </div>

                {sched.liveClassLink && (
                  <a
                    href={sched.liveClassLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-emerald-800 text-amber-200 text-xs font-bold hover:bg-emerald-900 transition-colors shrink-0"
                  >
                    লাইভ ক্লাসরুম
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notices */}
      {activeTab === 'notices' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold font-serif text-lg text-[#064E3B]">
            শিক্ষার্থীদের জন্য নোটিশ বোর্ড
          </h3>

          <div className="space-y-3">
            {studentNotices.map(notice => (
              <div key={notice.id} className="p-4 rounded-xl border border-amber-200 bg-[#FAF7F2] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">{notice.titleBn}</h4>
                  <span className="text-[11px] text-stone-500">{notice.dateBn}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">{notice.contentBn}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Fees */}
      {activeTab === 'fees' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-bold font-serif text-lg text-[#064E3B]">
            ফি ও হাদিয়া সংক্রান্ত তথ্য
          </h3>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-2">
            <p className="font-bold text-sm">হাদিয়া পরিশোধের নিয়মাবলী:</p>
            <p>
              ১. ভর্তি ও সময়সূচি নিশ্চিত হওয়ার পর নিয়মিত ক্লাসের পূর্বে মাসিক হাদিয়া নির্ধারিত হয়।
            </p>
            <p>
              ২. বাংলাদেশের শিক্ষার্থীদের জন্য বিকাশ / নগদ / ব্যাংক ট্রান্সফার এবং প্রবাসীদের জন্য রেমিট্যান্সের মাধ্যমে পরিশোধের সুবিধা রয়েছে।
            </p>
            <p>
              ৩. হাদিয়া পরিশোধ বা যেকোনো প্রশ্নে সরাসরি যোগাযোগ করুন: <strong>{db.siteSettings.phone}</strong>।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
            <span>আপনার কোর্সের নির্ধারিত মাসিক হাদিয়া:</span>
            <span className="text-base font-bold text-[#064E3B] font-serif">{course?.monthlyFeeBn || 'আলোচনা সাপেক্ষে'}</span>
          </div>
        </div>
      )}

      {/* Tab 5: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-serif text-lg text-[#064E3B]">
              আপনার প্রোফাইল তথ্য
            </h3>
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>সম্পাদনা করুন</span>
              </button>
            )}
          </div>

          {profileSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!</span>
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-500 block mb-1">শিক্ষার্থীর নাম (অপরিবর্তনযোগ্য):</label>
                <input
                  type="text"
                  disabled
                  value={student.studentName}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-100 text-stone-700 font-semibold"
                />
              </div>

              <div>
                <label className="text-stone-500 block mb-1">মোবাইল নম্বর:</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-500 block mb-1">ইমেইল:</label>
                <input
                  type="email"
                  disabled={!isEditingProfile}
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-800"
                />
              </div>

              <div>
                <label className="text-stone-500 block mb-1">পছন্দের ক্লাসের সময়:</label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileTime}
                  onChange={(e) => setProfileTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-800"
                />
              </div>
            </div>

            {isEditingProfile && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-5 py-2 rounded-xl bg-[#064E3B] text-white font-bold text-xs hover:bg-[#043B2C] flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>সংরক্ষণ করুন</span>
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 text-xs font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  বাতিল
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden receipt container used for high-res PDF generation */}
      <div className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none">
        <PrintableReceipt
          application={student}
          receiptElementId={`portal-receipt-${student.id}`}
        />
      </div>

      {/* Print Portal for Clean Paper / PDF Printing */}
      {typeof document !== 'undefined' && document.getElementById('printable-receipt-portal') && (
        createPortal(
          <PrintableReceipt application={student} isPrintOnly={true} />,
          document.getElementById('printable-receipt-portal')!
        )
      )}
    </div>
  );
};
