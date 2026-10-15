import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  GraduationCap, 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  Download,
  Loader2,
  Phone, 
  Calendar, 
  User, 
  BookOpen, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { AdmissionApplication } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { PrintableReceipt } from './PrintableReceipt';
import { downloadAdmissionPdf, printAdmissionReceipt } from '../../utils/pdfGenerator';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourseId?: string;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  preSelectedCourseId,
}) => {
  const { db, submitAdmission } = useAcademy();

  const [formData, setFormData] = useState({
    studentName: '',
    guardianName: '',
    phone: '',
    email: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    countryCity: 'বাংলাদেশ',
    courseId: preSelectedCourseId || (db.courses[0]?.id || ''),
    currentLevel: 'একদম নতুন (হরফ চেনে না)',
    preferredTime: 'বিকাল (৫:০০ - ৭:০০)',
    classType: 'one-on-one' as 'one-on-one' | 'small-group',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<AdmissionApplication | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCourse = db.courses.find(c => c.id === formData.courseId) || db.courses[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.studentName.trim()) {
      setErrorMsg('শিক্ষার্থীর নাম প্রদান করা আবশ্যক।');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      setErrorMsg('সঠিক মোবাইল নম্বর প্রদান করা আবশ্যক।');
      return;
    }

    try {
      setIsSubmitting(true);
      const app = await submitAdmission({
        studentName: formData.studentName.trim(),
        guardianName: formData.guardianName.trim() || undefined,
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        age: formData.age.trim() || 'উল্লেখ নেই',
        gender: formData.gender,
        countryCity: formData.countryCity.trim() || 'বাংলাদেশ',
        courseId: formData.courseId,
        courseTitle: currentCourse?.titleBn || 'কুরআন শিক্ষা',
        currentLevel: formData.currentLevel,
        preferredTime: formData.preferredTime,
        classType: formData.classType,
        additionalNotes: formData.additionalNotes.trim() || undefined,
      });

      setSubmittedApplication(app);
    } catch (err) {
      setErrorMsg('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = async () => {
    if (!submittedApplication) return;
    try {
      setIsPrinting(true);
      const res = await printAdmissionReceipt('admission-modal-receipt-content', submittedApplication);
      if (res.message) {
        setPrintFeedback(res.message);
        setTimeout(() => setPrintFeedback(null), 6000);
      }
    } catch (err) {
      console.error('Print handler notice:', err);
      window.print();
    } finally {
      setIsPrinting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!submittedApplication) return;
    try {
      setIsGeneratingPdf(true);
      await downloadAdmissionPdf('admission-modal-receipt-content', submittedApplication);
    } catch (err) {
      console.error('PDF generation error, falling back to print:', err);
      handlePrint();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-6 overflow-hidden shadow-2xl border-2 border-emerald-700 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#022C22] via-[#064E3B] to-[#043B2C] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                অনলাইন ভর্তি আবেদন ফর্ম
              </h3>
              <p className="text-xs text-amber-200">
                FS Darul Quran Online Academy • অনলাইন ভর্তি আবেদন
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

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {submittedApplication ? (
            /* Success Receipt View */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700 border-2 border-emerald-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#064E3B] font-serif">
                  আলহামদুলিল্লাহ! আপনার আবেদন সফলভাবে গৃহীত হয়েছে
                </h4>
                <p className="text-xs sm:text-sm text-stone-600">
                  আপনার ভর্তি আবেদনটি আমাদের ডাটাবেজে স্থায়ীভাবে সংরক্ষিত হয়েছে।
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="space-y-4">
                <PrintableReceipt 
                  application={submittedApplication} 
                  receiptElementId="admission-modal-receipt-content" 
                />

                {/* Print Portal for Clean Paper / PDF Printing */}
                {typeof document !== 'undefined' && document.getElementById('printable-receipt-portal') && (
                  createPortal(
                    <PrintableReceipt application={submittedApplication} isPrintOnly={true} />,
                    document.getElementById('printable-receipt-portal')!
                  )
                )}
              </div>

              {/* Feedback Notice for Print / PDF */}
              {printFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1 font-medium">{printFeedback}</div>
                </div>
              )}

              {/* Receipt Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={isPrinting}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 disabled:opacity-60"
                >
                  {isPrinting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#064E3B]" />
                      <span>প্রিন্ট প্রস্তুত হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Printer className="w-4 h-4 text-[#064E3B]" />
                      <span>আবেদনপত্র প্রিন্ট করুন</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-amber-400 bg-amber-400 hover:bg-amber-500 text-stone-900 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60 active:scale-98"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-900" />
                      <span>PDF তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-stone-900" />
                      <span>PDF ডাউনলোড</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedApplication(null);
                    onClose();
                  }}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-white bg-[#064E3B] hover:bg-[#043B2C] text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <span>সম্পন্ন করুন</span>
                </button>
              </div>
            </div>
          ) : (
            /* Input Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Course Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  যে কোর্সে ভর্তি হতে চান <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                >
                  {db.courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.titleBn} — ({course.monthlyFeeBn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Student Name & Guardian Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    শিক্ষার্থীর পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="যেমন: সালমান ফারসি"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    অভিভাবকের নাম (শিশুদের ক্ষেত্রে)
                  </label>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    placeholder="পিতা / মাতার নাম"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    মোবাইল নম্বর (হোয়াটসঅ্যাপ সচল) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01XXXXXXXXX বা আন্তর্জাতিক নম্বর"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    ইমেইল ঠিকানা (যদি থাকে)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Age, Gender & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    বয়স
                  </label>
                  <input
                    type="text"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="যেমন: ৮ বছর / ২৫ বছর"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    লিঙ্গ ও শিক্ষক পছন্দ
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="male">পুরুষ (উস্তাদ)</option>
                    <option value="female">নারী (মহিলা শিক্ষিকা)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    দেশ / শহর
                  </label>
                  <input
                    type="text"
                    value={formData.countryCity}
                    onChange={(e) => setFormData({ ...formData, countryCity: e.target.value })}
                    placeholder="যেমন: ঢাকা / লন্ডন, UK"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Current Level & Class Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    বর্তমান কুরআন শিক্ষার স্তর
                  </label>
                  <select
                    value={formData.currentLevel}
                    onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="একদম নতুন (হরফ চেনে না)">একদম নতুন (হরফ চেনে না)</option>
                    <option value="কিছু হরফ চেনে কিন্তু বানান করতে পারে না">কিছু হরফ চেনে কিন্তু বানান করতে পারে না</option>
                    <option value="বানান করে পড়তে পারে">বানান করে পড়তে পারে</option>
                    <option value="রিডিং পড়তে পারে কিন্তু ভুল হয় (সহিহ করতে চায়)">রিডিং পড়তে পারে কিন্তু ভুল হয় (সহিহ করতে চায়)</option>
                    <option value="নাজেরা সম্পন্ন, তাজবিদ শিখতে চায়">নাজেরা সম্পন্ন, তাজবিদ শিখতে চায়</option>
                    <option value="হিফজ শুরু করতে চায়">হিফজ শুরু করতে চায়</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    ক্লাসের ধরন
                  </label>
                  <select
                    value={formData.classType}
                    onChange={(e) => setFormData({ ...formData, classType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="one-on-one">১-অন-১ ওয়ান টু ওয়ান (ব্যক্তিগত যত্ন)</option>
                    <option value="small-group">ছোট গ্রুপ ব্যাচ (৩-৪ জন)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  পছন্দের ক্লাসের সময়
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="সকাল (৭:০০ - ৯:০০)">সকাল (৭:০০ - ৯:০০)</option>
                  <option value="সকাল (১০:০০ - ১২:০০ - বিশেষত গৃহিণীদের জন্য)">সকাল (১০:০০ - ১২:০০ - বিশেষত গৃহিণীদের জন্য)</option>
                  <option value="বিকাল (৪:৩০ - ৬:৩০ - বাচ্চাদের জন্য)">বিকাল (৪:৩০ - ৬:৩০ - বাচ্চাদের জন্য)</option>
                  <option value="সন্ধ্যা (৭:০০ - ৮:৩০)">সন্ধ্যা (৭:০০ - ৮:৩০)</option>
                  <option value="রাত (৯:০০ - ১১:০০ - কর্মজীবী ও চাকরিজীবীদের জন্য)">রাত (৯:০০ - ১১:০০ - কর্মজীবী ও চাকরিজীবীদের জন্য)</option>
                  <option value="প্রবাসী নিজস্ব টাইমজোন (আলোচনা সাপেক্ষে)">প্রবাসী নিজস্ব টাইমজোন (আলোচনা সাপেক্ষে)</option>
                </select>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  অতিরিক্ত তথ্য বা বিশেষ কোনো চাওয়া (ঐচ্ছিক)
                </label>
                <textarea
                  rows={2}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="যেমন: অমুক দিন ক্লাস করতে পারব না, কিংবা কোনো বিশেষ নির্দেশনা..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>আবেদন জমা দেওয়ার পর একাডেমি প্রতিনিধি আপনার সাথে সরাসরি যোগাযোগ করে ক্লাসের শিডিউল নিশ্চিত করবেন।</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#043B2C] hover:to-[#065F46] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-60"
              >
                <GraduationCap className="w-5 h-5 text-amber-300" />
                <span>{isSubmitting ? 'আবেদন জমা হচ্ছে...' : 'ভর্তি আবেদন জমা দিন'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
