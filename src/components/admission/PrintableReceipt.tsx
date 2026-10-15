import React from 'react';
import { AdmissionApplication } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface PrintableReceiptProps {
  application: AdmissionApplication;
  receiptElementId?: string;
  isPrintOnly?: boolean;
}

export const PrintableReceipt: React.FC<PrintableReceiptProps> = ({
  application,
  receiptElementId = 'admission-printable-receipt',
  isPrintOnly = false,
}) => {
  const getStatusText = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'approved':
        return { 
          text: 'ভর্তি অনুমোদিত (Approved)', 
          style: { color: '#065F46', backgroundColor: '#D1FAE5', borderColor: '#6EE7B7' } 
        };
      case 'trial_scheduled':
        return { 
          text: 'ক্লাসের সময় ও শিক্ষক নির্ধারিত (Schedule Confirmed)', 
          style: { color: '#5B21B6', backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' } 
        };
      case 'enrolled':
        return { 
          text: 'ভর্তি সম্পন্ন ও ক্লাসে সক্রিয় (Enrolled)', 
          style: { color: '#15803D', backgroundColor: '#DCFCE7', borderColor: '#86EFAC' } 
        };
      case 'reviewing':
        return { 
          text: 'পর্যালোচনাধীন (Under Review)', 
          style: { color: '#1E40AF', backgroundColor: '#DBEAFE', borderColor: '#93C5FD' } 
        };
      case 'rejected':
        return { 
          text: 'সাময়িকভাবে বাতিল (Rejected)', 
          style: { color: '#991B1B', backgroundColor: '#FEE2E2', borderColor: '#FCA5A5' } 
        };
      case 'pending':
      default:
        return { 
          text: 'আবেদন গৃহীত - প্রাথমিক যাচাইাধীন (Pending Review)', 
          style: { color: '#92400E', backgroundColor: '#FEF3C7', borderColor: '#FCD34D' } 
        };
    }
  };

  const statusInfo = getStatusText(application.status);

  // Format date nicely in Bengali
  const formattedDate = application.createdAt
    ? new Date(application.createdAt).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '১৪ অক্টোবর ২০২৬';

  return (
    <div
      id={receiptElementId}
      className={`font-sans p-6 sm:p-8 rounded-2xl border-2 shadow-xs max-w-2xl mx-auto ${
        isPrintOnly ? 'print:block' : ''
      }`}
      style={{ 
        fontFamily: "'Hind Siliguri', sans-serif",
        backgroundColor: '#ffffff',
        color: '#1C1917',
        borderColor: '#064E3B',
      }}
    >
      {/* Top Header with Islamic Green Branding */}
      <div className="pb-4 mb-5" style={{ borderBottom: '2px solid #D97706' }}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" textColor="dark" showText={false} />
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-serif leading-tight" style={{ color: '#064E3B' }}>
                FS Darul Quran Online Academy
              </h2>
              <p className="text-sm font-bold" style={{ color: '#B45309' }}>
                এফএস দারুল কুরআন অনলাইন একাডেমি
              </p>
              <p className="text-[11px] font-semibold mt-0.5 tracking-wide" style={{ color: '#57534E' }}>
                Quran | Sunnah | Better Ummah • কুরআন | সুন্নাহ | সুন্দর উম্মাহ
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div 
              className="px-3 py-1.5 rounded-lg text-center"
              style={{ backgroundColor: '#064E3B', color: '#FDE68A', border: '1px solid #FBBF24' }}
            >
              <span className="block text-[10px] font-medium tracking-wider text-white">ডকুমেন্ট ধরন</span>
              <strong className="text-xs font-bold font-serif">ভর্তি স্বীকৃতিপত্র</strong>
            </div>
          </div>
        </div>

        <div 
          className="flex flex-wrap items-center justify-between text-[11px] mt-3 pt-2.5"
          style={{ color: '#57534E', borderTop: '1px solid #E7E5E4' }}
        >
          <span>📞 হেল্পলাইন: <strong style={{ color: '#1C1917' }}>01300448147</strong></span>
          <span>📧 ইমেইল: <strong style={{ color: '#1C1917' }}>ahamadfoysal920@gmail.com</strong></span>
          <span>📅 তারিখ: <strong style={{ color: '#1C1917' }}>{formattedDate}</strong></span>
        </div>
      </div>

      {/* Application Tracking & Status Bar */}
      <div 
        className="p-4 rounded-xl mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        style={{ backgroundColor: '#FAF7F2', border: '1px solid #FDE68A' }}
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider block" style={{ color: '#78716C' }}>
            আবেদন ট্র্যাকিং নম্বর (Application ID)
          </span>
          <div className="text-xl font-mono font-black mt-0.5 tracking-wide" style={{ color: '#064E3B' }}>
            {application.id}
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[11px] font-semibold block" style={{ color: '#78716C' }}>আবেদনের বর্তমান অবস্থা:</span>
          <span 
            className="inline-block mt-0.5 text-xs font-bold px-3 py-1 rounded-full border"
            style={statusInfo.style}
          >
            {statusInfo.text}
          </span>
        </div>
      </div>

      {/* Main Student Information Table */}
      <div className="mb-5 overflow-hidden rounded-xl" style={{ border: '1px solid #E7E5E4' }}>
        <div 
          className="text-white px-4 py-2 font-bold text-xs font-serif flex items-center justify-between"
          style={{ backgroundColor: '#064E3B' }}
        >
          <span>শিক্ষার্থী ও কোর্সের বিস্তারিত তথ্য</span>
          <span className="text-[10px]" style={{ color: '#FDE68A' }}>Verified Application Record</span>
        </div>

        <table className="w-full text-xs text-left border-collapse">
          <tbody>
            <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F9F8F6' }}>
              <td className="py-2.5 px-4 font-semibold w-1/3" style={{ color: '#57534E' }}>শিক্ষার্থীর নাম:</td>
              <td className="py-2.5 px-4 font-bold text-sm font-serif" style={{ color: '#1C1917' }}>{application.studentName}</td>
            </tr>
            {application.guardianName && (
              <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
                <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>অভিভাবকের নাম:</td>
                <td className="py-2 px-4 font-medium" style={{ color: '#1C1917' }}>{application.guardianName}</td>
              </tr>
            )}
            <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F9F8F6' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>নির্বাচিত কোর্স:</td>
              <td className="py-2 px-4 font-bold" style={{ color: '#064E3B' }}>{application.courseTitle}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>মোবাইল নম্বর:</td>
              <td className="py-2 px-4 font-semibold" style={{ color: '#1C1917' }}>{application.phone}</td>
            </tr>
            {application.email && (
              <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F9F8F6' }}>
                <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>ইমেইল ঠিকানা:</td>
                <td className="py-2 px-4 font-mono text-[11px]" style={{ color: '#1C1917' }}>{application.email}</td>
              </tr>
            )}
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>বয়স ও লিঙ্গ:</td>
              <td className="py-2 px-4" style={{ color: '#1C1917' }}>
                {application.age} বছর • {application.gender === 'female' ? 'মহিলা (নারী)' : 'পুরুষ'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F9F8F6' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>দেশ / অবস্থান:</td>
              <td className="py-2 px-4" style={{ color: '#1C1917' }}>{application.countryCity}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>ক্লাসের ধরন:</td>
              <td className="py-2 px-4 font-medium" style={{ color: '#1C1917' }}>
                {application.classType === 'one-on-one' ? '১-অন-১ ওয়ান টু ওয়ান (ব্যক্তিগত যত্ন)' : 'ছোট গ্রুপ ব্যাচ'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F9F8F6' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>পছন্দের সময়:</td>
              <td className="py-2 px-4" style={{ color: '#1C1917' }}>{application.preferredTime}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>বর্তমান কুরআনিক স্তর:</td>
              <td className="py-2 px-4" style={{ color: '#1C1917' }}>{application.currentLevel}</td>
            </tr>
            {application.additionalNotes && (
              <tr style={{ borderBottom: '1px solid #E7E5E4', backgroundColor: '#F9F8F6' }}>
                <td className="py-2 px-4 font-semibold" style={{ color: '#57534E' }}>অতিরিক্ত মন্তব্য / নোট:</td>
                <td className="py-2 px-4 italic" style={{ color: '#1C1917' }}>{application.additionalNotes}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Trial / Teacher Schedule Box (if available) */}
      {application.assignedTeacher && (
        <div 
          className="p-3.5 rounded-xl mb-5 text-xs space-y-1"
          style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#064E3B' }}
        >
          <p className="font-bold" style={{ color: '#064E3B' }}>নির্ধারিত শিক্ষক ও ক্লাসের তথ্য:</p>
          <p>• শিক্ষক: <strong>{application.assignedTeacher}</strong></p>
          {application.trialDate && (
            <p>• ক্লাসের তারিখ ও সময়: <strong>{application.trialDate} ({application.trialTime || 'সময় সমন্বয় সাপেক্ষে'})</strong></p>
          )}
          {application.trialMeetingLink && (
            <p>• অনলাইন ক্লাসরুম লিংক: <span className="font-mono underline" style={{ color: '#065F46' }}>{application.trialMeetingLink}</span></p>
          )}
        </div>
      )}

      {/* Guidelines & Helpline Notice */}
      <div 
        className="p-3.5 rounded-xl mb-6 text-[11px] leading-relaxed space-y-1"
        style={{ backgroundColor: '#FAF7F2', border: '1px solid #FCD34D', color: '#44403C' }}
      >
        <p className="font-bold text-xs" style={{ color: '#064E3B' }}>একাডেমির প্রয়োজনীয় নির্দেশনাবলী:</p>
        <p>১. আপনার আবেদনটি সফলভাবে গৃহীত ও স্থায়ীভাবে নথিভুক্ত হয়েছে। ট্র্যাকিং আইডিটি ভবিষ্যৎ যোগাযোগের জন্য সংরক্ষণ করুন।</p>
        <p>২. আগামী ২৪ ঘণ্টার মধ্যে একাডেমি প্রতিনিধি আপনার সাথে সরাসরি যোগাযোগ করে ক্লাসের সময়সূচি ও গুগল মিট লিংক নিশ্চিত করবেন।</p>
        <p>৩. যেকোনো পরামর্শ বা তথ্যের জন্য কল বা হোয়াটসঅ্যাপ করুন: <strong>01300448147</strong>।</p>
      </div>

      {/* Official Signatures & Digital Stamp */}
      <div 
        className="pt-4 flex items-end justify-between text-xs"
        style={{ borderTop: '2px dashed #D6D3D1' }}
      >
        <div>
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center p-1 text-center"
            style={{ border: '2px dashed #064E3B', backgroundColor: '#ECFDF5' }}
          >
            <span className="text-[9px] font-bold uppercase tracking-tighter leading-tight" style={{ color: '#064E3B' }}>
              FS DARUL QURAN ACADEMY OFFICIAL
            </span>
          </div>
          <span className="text-[10px] mt-1 block" style={{ color: '#78716C' }}>ডিজিটাল ভেরিফায়েড রেকর্ড</span>
        </div>

        <div className="text-right">
          <div className="w-40 mb-1 ml-auto" style={{ borderBottom: '1px solid #A8A29E' }}></div>
          <strong className="block font-serif" style={{ color: '#1C1917' }}>অনুমোদনকারী কর্তৃপক্ষ</strong>
          <span className="text-[10px] block" style={{ color: '#57534E' }}>FS Darul Quran Online Academy</span>
        </div>
      </div>
    </div>
  );
};
