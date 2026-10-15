import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Video, 
  User, 
  GraduationCap,
  Sparkles,
  Printer,
  Download,
  Loader2,
  FileText
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { AdmissionApplication } from '../../types';
import { PrintableReceipt } from './PrintableReceipt';
import { downloadAdmissionPdf, printAdmissionReceipt } from '../../utils/pdfGenerator';

interface AdmissionTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApplicationForPortal?: (app: AdmissionApplication) => void;
}

export const AdmissionTracker: React.FC<AdmissionTrackerProps> = ({
  isOpen,
  onClose,
  onSelectApplicationForPortal,
}) => {
  const { searchAdmission, findAdmissionsByPhone } = useAcademy();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<AdmissionApplication[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [printApp, setPrintApp] = useState<AdmissionApplication | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearched(true);
    setIsSearching(true);
    setResults([]);

    const clean = query.trim();

    try {
      // 1. Search by ID (or phone) via context searchAdmission
      const searchRes = await searchAdmission(clean);
      if (searchRes.found && searchRes.application) {
        setResults([searchRes.application]);
        setIsSearching(false);
        return;
      }

      // 2. Fallback check for multiple matches by phone in local state
      const byPhone = findAdmissionsByPhone(clean);
      if (byPhone.length > 0) {
        setResults(byPhone);
        setIsSearching(false);
        return;
      }
    } catch (err) {
      console.warn('Admission search error:', err);
    }

    setResults([]);
    setIsSearching(false);
  };

  const handleDownloadPdf = async (app: AdmissionApplication) => {
    try {
      setDownloadingId(app.id);
      await downloadAdmissionPdf(`tracker-receipt-${app.id}`, app);
    } catch (err) {
      console.error('PDF generation error, fallback to print:', err);
      handlePrint(app);
    } finally {
      setDownloadingId(null);
    }
  };

  const handlePrint = (app: AdmissionApplication) => {
    setPrintApp(app);
    // Allow React to flush the portal content before triggering browser print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const getStatusBadge = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          label: 'আবেদন গৃহীত (প্রাথমিক যাচাইাধীন)'
        };
      case 'reviewing':
        return {
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          label: 'পর্যালোচনাধীন'
        };
      case 'trial_scheduled':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          label: 'ক্লাসের সময় ও শিক্ষক নির্ধারিত হয়েছে'
        };
      case 'approved':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          label: 'ভর্তি অনুমোদিত হয়েছে'
        };
      case 'enrolled':
        return {
          bg: 'bg-green-100 text-green-900 border-green-300',
          label: 'ক্লাসে সক্রিয় (ভর্তি সম্পন্ন)'
        };
      case 'rejected':
        return {
          bg: 'bg-red-100 text-red-900 border-red-300',
          label: 'আবেদন সাময়িকভাবে স্থগিত বা বাতিল'
        };
      default:
        return {
          bg: 'bg-stone-100 text-stone-800 border-stone-300',
          label: 'অজ্ঞাত'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-emerald-700 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#022C22] via-[#064E3B] to-[#043B2C] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif text-white">
                ভর্তি আবেদনের অবস্থা জানুন
              </h3>
              <p className="text-xs text-amber-200">
                Application Status & Schedule Tracker
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="আবেদন আইডি (যেমন: FSDQ-2026-2161) বা মোবাইল নম্বর লিখুন"
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#064E3B] hover:bg-[#043B2C] text-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-60"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>অনুসন্ধান...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>অনুসন্ধান</span>
                </>
              )}
            </button>
          </form>

          {/* Real Helper guidance */}
          <div className="text-[11px] text-stone-600 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200">
            ℹ️ ভর্তি আবেদন সম্পন্ন করার পর প্রাপ্ত <strong>আবেদন আইডি</strong> (যেমন: <code>FSDQ-2026-2161</code>) অথবা আপনার <strong>মোবাইল নম্বর</strong> প্রদান করে বর্তমান অবস্থা যাচাই করুন।
          </div>

          {/* Search Results */}
          {searched && !isSearching && (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="text-center py-8 bg-amber-50/50 rounded-xl border border-amber-200 text-stone-600 space-y-2">
                  <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                  <p className="text-base font-bold text-stone-900 font-serif">আবেদন পাওয়া যায়নি</p>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    প্রদত্ত আইডি বা মোবাইল নম্বরের বিপরীতে কোনো আবেদন খুঁজে পাওয়া যায়নি। অনুগ্রহ করে বানান ও নম্বর যাচাই করে পুনরায় চেষ্টা করুন।
                  </p>
                </div>
              ) : (
                results.map((app) => {
                  const statusInfo = getStatusBadge(app.status);
                  return (
                    <div
                      key={app.id}
                      className="bg-[#FAF7F2] p-5 rounded-xl border border-amber-200 space-y-3.5 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-3">
                        <div>
                          <span className="text-[11px] font-mono font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                            {app.id}
                          </span>
                          <h4 className="text-base font-bold font-serif text-stone-900 mt-1">
                            {app.studentName}
                          </h4>
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusInfo.bg}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs">
                        <div>
                          <span className="text-stone-500 block">কোর্স:</span>
                          <strong className="text-stone-800">{app.courseTitle}</strong>
                        </div>
                        <div>
                          <span className="text-stone-500 block">মোবাইল নম্বর:</span>
                          <span className="text-stone-800 font-medium">{app.phone}</span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">ক্লাসের ধরন:</span>
                          <span className="text-stone-800">
                            {app.classType === 'one-on-one' ? '১-অন-১ ওয়ান টু ওয়ান' : 'ছোট গ্রুপ ব্যাচ'}
                          </span>
                        </div>
                        <div>
                          <span className="text-stone-500 block">পছন্দের সময়:</span>
                          <span className="text-stone-800">{app.preferredTime}</span>
                        </div>
                      </div>

                      {/* Trial or Teacher details if assigned */}
                      {app.assignedTeacher && (
                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-xs text-emerald-950 space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-emerald-700" />
                            <span>নির্ধারিত শিক্ষক: <strong>{app.assignedTeacher}</strong></span>
                          </div>
                          {app.trialDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                              <span>ক্লাসের সময়সূচি: <strong>{app.trialDate} ({app.trialTime || 'সময় নিশ্চিত করা হবে'})</strong></span>
                            </div>
                          )}
                          {app.trialMeetingLink && (
                            <div className="pt-1">
                              <a
                                href={app.trialMeetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#064E3B] text-amber-200 text-xs font-bold hover:bg-[#043B2C]"
                              >
                                <Video className="w-3.5 h-3.5" />
                                <span>অনলাইন ক্লাসরুম জয়েন করুন</span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Admin notes */}
                      {app.adminNotes && (
                        <div className="text-xs text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200">
                          <strong>একাডেমির বার্তা:</strong> {app.adminNotes}
                        </div>
                      )}

                      {/* Action Buttons: Print & Download PDF */}
                      <div className="pt-2 border-t border-stone-200 flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePrint(app)}
                          className="flex-1 py-2 px-3 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#064E3B]" />
                          <span>আবেদনপত্র প্রিন্ট</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(app)}
                          disabled={downloadingId === app.id}
                          className="flex-1 py-2 px-3 rounded-lg border border-amber-400 bg-amber-400 hover:bg-amber-500 text-stone-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60 active:scale-98"
                        >
                          {downloadingId === app.id ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>PDF হচ্ছে...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF ডাউনলোড</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Hidden receipt container used to generate the high-res PDF */}
                      <div className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none">
                        <PrintableReceipt
                          application={app}
                          receiptElementId={`tracker-receipt-${app.id}`}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Print Portal for Clean Paper / PDF Printing */}
      {printApp && typeof document !== 'undefined' && document.getElementById('printable-receipt-portal') && (
        createPortal(
          <PrintableReceipt application={printApp} isPrintOnly={true} />,
          document.getElementById('printable-receipt-portal')!
        )
      )}
    </div>
  );
};
