import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  Menu, 
  X, 
  GraduationCap, 
  UserCheck, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenAdmissionModal: (courseId?: string) => void;
  onOpenTrackerModal: () => void;
  onOpenAuthModal: () => void;
  currentView: string;
  setCurrentView: (view: 'home' | 'courses' | 'about' | 'teachers' | 'admission' | 'portal' | 'admin' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdmissionModal,
  onOpenTrackerModal,
  onOpenAuthModal,
  currentView,
  setCurrentView,
}) => {
  const { db, language, setLanguage, isAdmin, adminLogout } = useAcademy();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const navItems = [
    { id: 'home', labelBn: 'হোম', labelEn: 'Home' },
    { id: 'courses', labelBn: 'কোর্সসমূহ', labelEn: 'Courses' },
    { id: 'about', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us' },
    { id: 'teachers', labelBn: 'শিক্ষকমণ্ডলী', labelEn: 'Teachers' },
    { id: 'admission', labelBn: 'ভর্তি প্রক্রিয়া', labelEn: 'Admission' },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
  ];

  const handleNavClick = (viewId: any) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-sm transition-all">
      {/* Top Emerald Announcement Bar */}
      <div className="bg-[#064E3B] text-amber-100 text-xs py-1.5 px-4 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Slogan & Notice Ticker */}
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-500 text-[#022C22] font-bold px-2 py-0.5 rounded text-[10px] tracking-wide shrink-0">
              {language === 'bn' ? 'নোটিশ' : 'NOTICE'}
            </span>
            <span className="text-emerald-100/90 text-xs hidden sm:inline">
              {db.siteSettings.announcementBn}
            </span>
            <span className="text-amber-300 font-semibold sm:hidden">
              {db.siteSettings.sloganBn}
            </span>
          </div>

          {/* Direct Contact Links */}
          <div className="flex items-center gap-4 text-xs font-medium ml-auto">
            <a 
              href={`tel:${db.siteSettings.phone}`} 
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{db.siteSettings.phone}</span>
            </a>
            <a 
              href={`mailto:${db.siteSettings.email}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{db.siteSettings.email}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-emerald-800/80 hover:bg-emerald-700 text-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-600 transition-all cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3 h-3 text-amber-300" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition-opacity hover:opacity-95"
        >
          <BrandLogo size="md" textColor="dark" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-[#064E3B] border border-emerald-200 font-bold'
                    : 'text-stone-700 hover:text-[#064E3B] hover:bg-emerald-50/50'
                }`}
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Tracker Button */}
          <button
            onClick={onOpenTrackerModal}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-lg transition-all cursor-pointer shadow-xs"
            title="ভর্তি আবেদনের বর্তমান অবস্থা জানুন"
          >
            <Search className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'bn' ? 'আবেদন ট্র্যাক' : 'Track App'}</span>
          </button>

          {/* Student / Admin Portal Button */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentView('admin')}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 px-3 py-2 rounded-lg transition-all shadow-xs cursor-pointer border border-amber-500"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
              </button>
              <button
                onClick={adminLogout}
                className="text-xs text-red-600 hover:text-red-800 font-medium px-1.5 py-1"
                title="Logout"
              >
                লগআউট
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-[#064E3B] hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-lg transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'bn' ? 'পোর্টাল / লগইন' : 'Portal'}</span>
            </button>
          )}

          {/* Admission CTA Button */}
          <button
            onClick={() => onOpenAdmissionModal()}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#043B2C] hover:to-[#065F46] px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer border border-emerald-800 transform active:scale-95"
          >
            <GraduationCap className="w-4 h-4 text-amber-300" />
            <span>{language === 'bn' ? 'ভর্তি আবেদন' : 'Apply Now'}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => onOpenAdmissionModal()}
            className="text-xs font-bold text-white bg-[#064E3B] px-3 py-1.5 rounded-lg sm:hidden"
          >
            ভর্তি আবেদন
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-[#064E3B] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-amber-200 px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-emerald-50 text-[#064E3B] font-bold border-l-4 border-[#064E3B]'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {language === 'bn' ? item.labelBn : item.labelEn}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackerModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <Search className="w-4 h-4 text-emerald-700" />
              <span>ভর্তি আবেদনের অবস্থা ট্র্যাক করুন</span>
            </button>

            {isAdmin ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('admin');
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-amber-950 bg-amber-400 rounded-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>অ্যাডমিন ড্যাশবোর্ড</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-stone-700 bg-stone-100 rounded-lg"
              >
                <UserCheck className="w-4 h-4 text-emerald-800" />
                <span>শিক্ষার্থী / অ্যাডমিন পোর্টাল</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmissionModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] rounded-lg shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>অনলাইন ভর্তি ফর্ম পূরণ করুন</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
