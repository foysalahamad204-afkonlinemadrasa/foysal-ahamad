import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Users, 
  Video, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { BrandLogo } from '../common/BrandLogo';

interface HeroBannerProps {
  onOpenAdmissionModal: (courseId?: string) => void;
  onExploreCourses: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenAdmissionModal,
  onExploreCourses,
}) => {
  const { db, language } = useAcademy();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#022C22] via-[#064E3B] to-[#043B2C] text-white pt-8 pb-16 lg:py-20 border-b-4 border-[#D97706]">
      {/* Decorative Islamic Geometric Overlay Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#CCA43B 1.5px, transparent 1.5px), radial-gradient(#FBBF24 1.5px, #022C22 1.5px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
        }}
      />

      {/* Subtle Arch Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Centered Bismillah & Ayah */}
        <div className="text-center mb-6">
          <p className="font-serif text-amber-300 text-lg sm:text-2xl tracking-widest opacity-95">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 rounded-full bg-emerald-900/60 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>&ldquo;তোমাদের মধ্যে সর্বোত্তম ব্যক্তি সে, যে কুরআন শিখে এবং অন্যকে শেখায়&rdquo; — সহিহ বুখারী</span>
          </div>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Academy Title & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider">
              <span>{db.siteSettings.sloganBn}</span>
              <span className="text-amber-400">•</span>
              <span>{db.siteSettings.sloganEn}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif leading-tight">
              ঘরে বসেই বিশুদ্ধভাবে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                পবিত্র কুরআনুল কারীম
              </span>{' '}
              শিক্ষা নিন
            </h1>

            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {db.siteSettings.bannerSubtitleBn} নূরানি, নাজেরা, সহিহ তিলাওয়াত, তাজবিদ ও হিফজ কোর্সে অভিজ্ঞ হাফেজ ও সার্টিফাইড ক্বারী সাহেবের সরাসরি ১-অন-১ তত্ত্বাবধানে পাঠদান। শিশু ও মা-বোনদের জন্য সম্পূর্ণ পর্দানশীন পরিবেশে স্বতন্ত্র মহিলা শিক্ষিকা।
            </p>

            {/* Key Value Points Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto lg:mx-0 text-xs sm:text-sm text-emerald-100">
              <div className="flex items-center gap-2 bg-emerald-900/40 p-2 rounded-lg border border-emerald-700/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>১০০% ওয়ান-টু-ওয়ান ক্লাস</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/40 p-2 rounded-lg border border-emerald-700/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>নারীদের জন্য মহিলা শিক্ষিকা</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/40 p-2 rounded-lg border border-emerald-700/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>যেকোনো সুবিধাজনক সময়সূচি</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-900/40 p-2 rounded-lg border border-emerald-700/50">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>অভিজ্ঞ ও দক্ষ শিক্ষকমণ্ডলী</span>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onOpenAdmissionModal()}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-emerald-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer border border-amber-200"
              >
                <GraduationCap className="w-5 h-5 text-emerald-950" />
                <span>ভর্তি আবেদন করুন</span>
                <ArrowRight className="w-4 h-4 text-emerald-900" />
              </button>

              <button
                onClick={onExploreCourses}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500/60 shadow transition-all cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span>কোর্সসমূহ দেখুন</span>
              </button>
            </div>

            {/* Instant Direct Contact Bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-emerald-200">
              <span>জরুরি পরামর্শ বা তথ্য জানতে:</span>
              <a 
                href={`tel:${db.siteSettings.phone}`}
                className="inline-flex items-center gap-1.5 text-amber-300 font-bold hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{db.siteSettings.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Academy Emblem & Highlights Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-[#065F46]/90 to-[#022C22]/95 rounded-2xl p-6 sm:p-8 border-2 border-[#D97706]/70 shadow-2xl backdrop-blur-sm">
              {/* Corner Arabesque Flourish */}
              <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

              {/* Centered Grand Academy Emblem */}
              <div className="flex flex-col items-center text-center space-y-4">
                <BrandLogo size="xl" showText={false} />

                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    {db.siteSettings.academyNameBn}
                  </h2>
                  <p className="text-xs text-amber-300 font-medium tracking-widest uppercase mt-0.5">
                    {db.siteSettings.sloganEn}
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent my-2" />

                {/* Features Matrix inside Card */}
                <div className="w-full space-y-3 text-left">
                  <div className="flex items-start gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800">
                    <Video className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-200">ডিজিটাল কুরআন স্ক্রিন ও সরাসরি মাশক</h4>
                      <p className="text-xs text-emerald-100/80">
                        Zoom বা Google Meet-এর মাধ্যমে কালার কোডেড তাজবিদ কুরআন প্রদর্শন করে প্রতিটি আয়াত উচ্চারণ শুধরে দেওয়া হয়।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800">
                    <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-200">ফ্লেক্সিবল আন্তর্জাতিক সময়সূচি</h4>
                      <p className="text-xs text-emerald-100/80">
                        বাংলাদেশসহ প্রবাসী শিক্ষার্থী (ইউকে, ইউএসএ, কানাডা, মিডল ইস্ট)-এর নিজস্ব টাইমজোনে ক্লাস।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-emerald-950/60 p-3 rounded-xl border border-emerald-800">
                    <Users className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-200">সাপ্তাহিক ও মাসিক মূল্যায়ন রিপোর্ট</h4>
                      <p className="text-xs text-emerald-100/80">
                        প্রতিটি শিক্ষার্থীর পড়া অগ্রগতি সরাসরি পর্যবেক্ষণ ও অভিভাবকদের নিয়মিত ফিডব্যাক প্রদান।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Action */}
                <button
                  onClick={() => onOpenAdmissionModal()}
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>আজই অনলাইনে ভর্তি আবেদন ফর্ম জমা দিন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
