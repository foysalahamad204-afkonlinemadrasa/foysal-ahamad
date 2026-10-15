import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  GraduationCap, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { AdmissionApplication } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentLoginSuccess: (student: AdmissionApplication) => void;
  onAdminLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onStudentLoginSuccess,
  onAdminLoginSuccess,
}) => {
  const { adminLogin, findAdmissionById, findAdmissionsByPhone } = useAcademy();

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student');

  // Student Login State
  const [studentIdOrPhone, setStudentIdOrPhone] = useState('');
  const [studentError, setStudentError] = useState('');

  // Admin Login State
  const [adminEmailInput, setAdminEmailInput] = useState('ahamadfoysal920@gmail.com');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  if (!isOpen) return null;

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentError('');

    const clean = studentIdOrPhone.trim();
    if (!clean) {
      setStudentError('অনুগ্রহ করে আপনার আবেদন ট্র্যাকিং আইডি অথবা মোবাইল নম্বর প্রদান করুন।');
      return;
    }

    const byId = findAdmissionById(clean);
    if (byId) {
      onStudentLoginSuccess(byId);
      onClose();
      return;
    }

    const byPhone = findAdmissionsByPhone(clean);
    if (byPhone.length > 0) {
      onStudentLoginSuccess(byPhone[0]);
      onClose();
      return;
    }

    setStudentError('কোনো আবেদন বা শিক্ষার্থী খুঁজে পাওয়া যায়নি। সঠিক তথ্য দিন অথবা প্রথমে ভর্তি ফর্ম পূরণ করুন।');
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (!adminPassword.trim()) {
      setAdminError('পাসওয়ার্ড প্রদান করা আবশ্যক।');
      return;
    }

    try {
      setIsLoggingIn(true);
      const res = await adminLogin(adminEmailInput, adminPassword);
      if (res.success) {
        setAdminPassword('');
        onAdminLoginSuccess();
        onClose();
      } else {
        setAdminError(res.error || 'লগইন ব্যর্থ হয়েছে।');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-emerald-700 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#022C22] via-[#064E3B] to-[#043B2C] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">
                পোর্টাল লগইন
              </h3>
              <p className="text-xs text-amber-200">
                FS Darul Quran Online Academy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'student'
                ? 'bg-white text-[#064E3B] border-b-2 border-[#064E3B]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>শিক্ষার্থী পোর্টাল</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'admin'
                ? 'bg-white text-[#064E3B] border-b-2 border-[#064E3B]'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>অ্যাডমিন প্যানেল</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {activeTab === 'student' ? (
            /* Student Login Form */
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                ভর্তি আবেদন জমা দেওয়ার সময় প্রাপ্ত <strong>Application ID</strong> (যেমন: <code>FSDQ-2026-XXXX</code>) অথবা আপনার নিবন্ধিত <strong>মোবাইল নম্বর</strong> দিন।
              </p>

              {studentError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{studentError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  আবেদন আইডি বা মোবাইল নম্বর
                </label>
                <input
                  type="text"
                  required
                  value={studentIdOrPhone}
                  onChange={(e) => setStudentIdOrPhone(e.target.value)}
                  placeholder="FSDQ-2026-XXXX অথবা 01XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white bg-[#064E3B] hover:bg-[#043B2C] text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>শিক্ষার্থী পোর্টালে প্রবেশ করুন</span>
              </button>
            </form>
          ) : (
            /* Admin Login Form */
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs text-amber-900">
                <strong>নির্ধারিত অ্যাডমিন ইমেইল:</strong>
                <div className="font-mono text-[11px] mt-0.5 font-bold">ahamadfoysal920@gmail.com</div>
              </div>

              {adminError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  অ্যাডমিন ইমেইল
                </label>
                <input
                  type="email"
                  required
                  value={adminEmailInput}
                  onChange={(e) => setAdminEmailInput(e.target.value)}
                  placeholder="ahamadfoysal920@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  autoComplete="current-password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-800 to-[#064E3B] hover:from-emerald-900 hover:to-[#043B2C] text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <KeyRound className="w-4 h-4 text-amber-300" />
                <span>{isLoggingIn ? 'যাচাই করা হচ্ছে...' : 'অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
