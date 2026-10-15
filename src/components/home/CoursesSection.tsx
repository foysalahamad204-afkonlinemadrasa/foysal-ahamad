import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  CheckCircle2, 
  GraduationCap, 
  ArrowRight, 
  Eye, 
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';
import { Course } from '../../types';

interface CoursesSectionProps {
  onOpenAdmissionModal: (courseId?: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onOpenAdmissionModal }) => {
  const { db, language } = useAcademy();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);

  // Active courses only for public view
  const activeCourses = db.courses.filter(c => c.isActive !== false);

  const categories = [
    { id: 'all', labelBn: 'সকল কোর্স', labelEn: 'All Courses' },
    { id: 'basic', labelBn: 'নূরানি ও নাজেরা', labelEn: 'Basic & Nazera' },
    { id: 'tajweed', labelBn: 'সহিহ তিলাওয়াত ও তাজবিদ', labelEn: 'Sahih Recitation & Tajweed' },
    { id: 'hifz', labelBn: 'হিফজুল কুরআন', labelEn: 'Tahfeez Program' },
    { id: 'special', labelBn: 'নারী, শিশু ও প্রবাসী ব্যাচ', labelEn: 'Special & Sisters' },
    { id: 'general', labelBn: 'দোয়া ও ইসলামিক শিক্ষা', labelEn: 'Duas & Fard Ayn' },
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? activeCourses 
    : activeCourses.filter(c => c.category === selectedCategory);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>আমাদের কোর্সসমূহ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            আপনার পছন্দের ইসলামিক কোর্স নির্বাচন করুন
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            শিশুদের সহজ পাঠদান থেকে শুরু করে প্রাপ্তবয়স্কদের জন্য ব্যক্তিগত ১-অন-১ তত্ত্বাবধানে সহিহ কুরআন ও দ্বীনি শিক্ষা।
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#064E3B] text-amber-200 shadow-md border border-emerald-700'
                  : 'bg-white text-stone-700 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-amber-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-[#064E3B]"
            >
              {/* Card Header Top Banner */}
              <div className="p-6 pb-4 border-b border-stone-100 bg-gradient-to-br from-emerald-50/60 to-amber-50/30">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#064E3B] text-amber-300">
                    {course.classTypeBn}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                    {course.durationBn}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#064E3B] group-hover:text-amber-800 transition-colors line-clamp-2">
                  {course.titleBn}
                </h3>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {course.shortDescBn}
                </p>
              </div>

              {/* Course Meta Info */}
              <div className="p-6 py-4 space-y-2.5 text-xs text-stone-600 bg-white">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>ক্লাস সংখ্যা: <strong className="text-stone-800">{course.classesPerWeekBn}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>ক্লাসের সময়: <strong className="text-stone-800">{course.classDurationBn}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>শিক্ষক: <strong className="text-stone-800">{course.teacherNameBn}</strong></span>
                </div>

                {/* Monthly Fee Display */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">মাসিক হাদিয়া/ফি:</span>
                  <span className="text-base font-bold text-[#064E3B] font-serif">
                    {course.monthlyFeeBn}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-3 bg-stone-50 border-t border-stone-100 flex items-center gap-2.5">
                <button
                  onClick={() => setDetailCourse(course)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-emerald-300 text-xs font-bold text-[#064E3B] bg-white hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4 text-emerald-700" />
                  <span>বিস্তারিত সিলেবাস</span>
                </button>

                <button
                  onClick={() => onOpenAdmissionModal(course.id)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#064E3B] hover:bg-[#043B2C] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow active:scale-95 border border-emerald-800"
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  <span>ভর্তি আবেদন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Detail Modal */}
      {detailCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-2 border-emerald-700">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#022C22] via-[#064E3B] to-[#043B2C] text-white flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400 text-emerald-950 mb-2 inline-block">
                  {detailCourse.classTypeBn}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {detailCourse.titleBn}
                </h3>
                <p className="text-xs text-amber-200 mt-1">
                  {detailCourse.titleEn}
                </p>
              </div>
              <button
                onClick={() => setDetailCourse(null)}
                className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-700">
              {/* Description */}
              <div>
                <h4 className="font-bold text-[#064E3B] text-base mb-1 font-serif">কোর্সের বিবরণ</h4>
                <p className="text-stone-600 leading-relaxed text-sm">
                  {detailCourse.fullDescBn}
                </p>
              </div>

              {/* Fast Facts Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/70 text-xs">
                <div>
                  <span className="text-stone-500 block">কোর্সের মেয়াদ:</span>
                  <strong className="text-stone-900 font-semibold">{detailCourse.durationBn}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">সাপ্তাহিক ক্লাস:</span>
                  <strong className="text-stone-900 font-semibold">{detailCourse.classesPerWeekBn}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">ক্লাসের সময়:</span>
                  <strong className="text-stone-900 font-semibold">{detailCourse.classDurationBn}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">হাদিয়া/ফি:</span>
                  <strong className="text-emerald-900 font-bold">{detailCourse.monthlyFeeBn}</strong>
                </div>
              </div>

              {/* Curriculum Points */}
              {detailCourse.curriculumBn && detailCourse.curriculumBn.length > 0 && (
                <div>
                  <h4 className="font-bold text-[#064E3B] text-base mb-2 font-serif flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>সিলেবাস ও যা যা শেখানো হবে</span>
                  </h4>
                  <ul className="space-y-2">
                    {detailCourse.curriculumBn.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {detailCourse.featuresBn && detailCourse.featuresBn.length > 0 && (
                <div>
                  <h4 className="font-bold text-[#064E3B] text-base mb-2 font-serif">বিশেষ সুবিধাসমূহ</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {detailCourse.featuresBn.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200 text-xs text-stone-800">
                        <span className="text-amber-600 font-bold">★</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitable For */}
              <div className="text-xs bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900">
                <strong>কাদের জন্য উপযুক্ত:</strong> {detailCourse.suitableForBn}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setDetailCourse(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                বন্ধ করুন
              </button>
              <button
                onClick={() => {
                  const cId = detailCourse.id;
                  setDetailCourse(null);
                  onOpenAdmissionModal(cId);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#043B2C] hover:to-[#065F46] shadow-md transition-all cursor-pointer text-sm"
              >
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>এই কোর্সে ভর্তি আবেদন করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
