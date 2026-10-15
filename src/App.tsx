import React, { useState } from 'react';
import { AcademyProvider, useAcademy } from './context/AcademyContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { AboutSection } from './components/home/AboutSection';
import { CurriculumSection } from './components/home/CurriculumSection';
import { CoursesSection } from './components/home/CoursesSection';
import { TeachersSection } from './components/home/TeachersSection';
import { OnlineClassBenefits } from './components/home/OnlineClassBenefits';
import { AdmissionProcess } from './components/home/AdmissionProcess';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';
import { AdmissionModal } from './components/admission/AdmissionModal';
import { AdmissionTracker } from './components/admission/AdmissionTracker';
import { AuthModal } from './components/portal/AuthModal';
import { StudentPortal } from './components/portal/StudentPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdmissionApplication } from './types';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

function AcademyAppContent() {
  const { db, isAdmin, adminLogout } = useAcademy();

  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'courses' | 'about' | 'teachers' | 'admission' | 'portal' | 'admin' | 'contact'>('home');

  // Modal States
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [selectedCourseForAdmission, setSelectedCourseForAdmission] = useState<string | undefined>(undefined);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Active Logged-in Student Session
  const [activeStudent, setActiveStudent] = useState<AdmissionApplication | null>(null);

  const openAdmission = (courseId?: string) => {
    setSelectedCourseForAdmission(courseId);
    setIsAdmissionModalOpen(true);
  };

  const handleStudentLoginSuccess = (student: AdmissionApplication) => {
    setActiveStudent(student);
    setCurrentView('portal');
  };

  const handleAdminLoginSuccess = () => {
    setCurrentView('admin');
  };

  const handleStudentLogout = () => {
    setActiveStudent(null);
    setCurrentView('home');
  };

  const whatsappUrl = `https://wa.me/${db.siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('আসসালামু আলাইকুম। FS Darul Quran Online Academy সম্পর্কে জানতে চাই।')}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A2E26] selection:bg-[#064E3B] selection:text-[#FBBF24]">
      {/* Header */}
      <Header
        onOpenAdmissionModal={openAdmission}
        onOpenTrackerModal={() => setIsTrackerModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentView={currentView}
        setCurrentView={(view) => {
          if (view === 'portal' && !activeStudent) {
            setIsAuthModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
      />

      {/* Main Body Content based on View */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          isAdmin ? (
            <AdminDashboard />
          ) : (
            <div className="py-20 text-center max-w-md mx-auto px-4">
              <h2 className="text-xl font-bold font-serif text-[#064E3B] mb-2">
                অ্যাডমিন অনুমোদনের প্রয়োজন
              </h2>
              <p className="text-xs text-stone-600 mb-4">
                অনুগ্রহ করে অনুমোদিত ইমেইল (ahamadfoysal920@gmail.com) দিয়ে লগইন করুন।
              </p>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold text-xs"
              >
                লগইন মডাল খুলুন
              </button>
            </div>
          )
        ) : currentView === 'portal' && activeStudent ? (
          <StudentPortal
            student={activeStudent}
            onLogout={handleStudentLogout}
          />
        ) : currentView === 'courses' ? (
          <div className="py-8">
            <CoursesSection onOpenAdmissionModal={openAdmission} />
          </div>
        ) : currentView === 'about' ? (
          <div className="py-8">
            <AboutSection />
            <CurriculumSection onSelectCourse={openAdmission} />
          </div>
        ) : currentView === 'teachers' ? (
          <div className="py-8">
            <TeachersSection />
            <OnlineClassBenefits />
          </div>
        ) : currentView === 'admission' ? (
          <div className="py-8">
            <AdmissionProcess onOpenAdmissionModal={() => openAdmission()} />
            <FaqSection />
          </div>
        ) : currentView === 'contact' ? (
          <div className="py-8">
            <ContactSection />
          </div>
        ) : (
          /* Default: Full Complete Homepage */
          <>
            {/* 1. Hero Banner with Logo & Bismillah */}
            <HeroBanner
              onOpenAdmissionModal={openAdmission}
              onExploreCourses={() => {
                const el = document.getElementById('courses');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. About Us */}
            <AboutSection />

            {/* 3. Curriculum Roadmap */}
            <CurriculumSection onSelectCourse={openAdmission} />

            {/* 4. Courses Section */}
            <CoursesSection onOpenAdmissionModal={openAdmission} />

            {/* 5. Teachers Section */}
            <TeachersSection />

            {/* 6. Online Class Benefits */}
            <OnlineClassBenefits />

            {/* 7. Admission 4-step Process */}
            <AdmissionProcess onOpenAdmissionModal={() => openAdmission()} />

            {/* 8. Testimonials */}
            <TestimonialsSection />

            {/* 9. FAQs */}
            <FaqSection />

            {/* 10. Contact Information & Message Form */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmissionModal={openAdmission}
        onOpenTrackerModal={() => setIsTrackerModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        setCurrentView={setCurrentView}
      />

      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
          title="WhatsApp-এ যোগাযোগ করুন"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="text-xs font-bold hidden sm:inline">হোয়াটসঅ্যাপে কথা বলুন</span>
        </a>

        <a
          href={`tel:${db.siteSettings.phone}`}
          className="flex items-center justify-center w-11 h-11 bg-[#064E3B] hover:bg-[#043B2C] text-amber-300 rounded-full shadow-lg border border-amber-400 transition-all cursor-pointer sm:hidden"
          title="কল করুন"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Modals */}
      <AdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        preSelectedCourseId={selectedCourseForAdmission}
      />

      <AdmissionTracker
        isOpen={isTrackerModalOpen}
        onClose={() => setIsTrackerModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onStudentLoginSuccess={handleStudentLoginSuccess}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <AcademyProvider>
      <AcademyAppContent />
    </AcademyProvider>
  );
}
