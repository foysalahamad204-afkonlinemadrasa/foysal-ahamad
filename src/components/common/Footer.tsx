import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Heart, 
  ShieldCheck, 
  ArrowUp,
  GraduationCap
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenAdmissionModal: (courseId?: string) => void;
  onOpenTrackerModal: () => void;
  onOpenAuthModal: () => void;
  setCurrentView: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmissionModal,
  onOpenTrackerModal,
  onOpenAuthModal,
  setCurrentView,
}) => {
  const { db } = useAcademy();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#043B2C] via-[#022C22] to-[#011B14] text-white pt-16 pb-8 border-t-4 border-[#D97706] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/80">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" textColor="light" />
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed pt-2">
              <strong>{db.siteSettings.academyNameBn}</strong> পবিত্র কুরআনুল কারীমের বিশুদ্ধ তাজবিদ, সহিহ মাখরাজ ও প্রয়োজনীয় দ্বীনি শিক্ষা বিশ্বব্যাপী মুসলিম ভাই-বোনদের মাঝে ছড়িয়ে দেওয়ার এক বিশ্বস্ত অনলাইন ঠিকানা।
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-400 text-emerald-950 font-serif">
                {db.siteSettings.sloganEn}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 font-serif uppercase tracking-wider">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>
                <button 
                  onClick={() => { setCurrentView('home'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  হোম পেজ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('courses'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  কোর্সসমূহ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('about'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('teachers'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  অভিজ্ঞ শিক্ষকমণ্ডলী
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('admission'); scrollToTop(); }}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  ভর্তি প্রক্রিয়া
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTrackerModal}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-amber-200 font-semibold"
                >
                  আবেদন অবস্থা ট্র্যাকিং
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 font-serif uppercase tracking-wider">
              জনপ্রিয় কোর্সসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              {db.courses.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onOpenAdmissionModal(c.id)}
                    className="hover:text-amber-300 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="text-amber-400">›</span>
                    <span>{c.titleBn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-amber-300 font-serif uppercase tracking-wider">
              যোগাযোগ ও হটলাইন
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/90">
              <a 
                href={`tel:${db.siteSettings.phone}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{db.siteSettings.phone}</span>
              </a>
              <a 
                href={`mailto:${db.siteSettings.email}`}
                className="flex items-center gap-2 hover:text-amber-300 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{db.siteSettings.email}</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{db.siteSettings.addressBn}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAdmissionModal()}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-emerald-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>ভর্তি আবেদন করুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <p>
            © {new Date().getFullYear()} <strong>FS Darul Quran Online Academy</strong>. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAuthModal}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              পোর্টাল লগইন
            </button>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>উপরে যান</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
