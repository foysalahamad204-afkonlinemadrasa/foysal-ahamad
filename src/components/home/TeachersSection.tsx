import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Sparkles, 
  CheckCircle,
  UserCheck,
  Shield
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export const TeachersSection: React.FC = () => {
  const { db } = useAcademy();
  const activeTeachers = db.teachers.filter(t => t.isActive !== false);

  return (
    <section id="teachers" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>আমাদের শিক্ষকমণ্ডলী</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            যোগ্য, সার্টিফাইড ও আন্তরিক শিক্ষকমণ্ডলী
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            আলিয়া ও কওমি মাদ্রাসার সর্বোচ্চ ডিগ্রিধারী, সনদপ্রাপ্ত ক্বারী, হাফেজে কুরআন এবং মা-বোনদের জন্য নিবেদিত নারী শিক্ষিকাদের তত্ত্বাবধানে আমাদের পাঠদান পরিচালিত হয়।
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-[#FAF7F2] rounded-2xl p-6 border border-stone-200/90 hover:border-emerald-600 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Avatar / Islamic Emblem Badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#064E3B] to-[#047857] text-amber-300 flex items-center justify-center font-serif text-2xl font-bold shadow-md mb-4 group-hover:scale-105 transition-transform border-2 border-amber-400/50">
                  {teacher.gender === 'female' ? 'ح' : 'ف'}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    teacher.gender === 'female' 
                      ? 'bg-rose-100 text-rose-900 border border-rose-200' 
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {teacher.gender === 'female' ? 'মহিলা শিক্ষিকা' : 'উস্তাদ'}
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium">
                    {teacher.experienceBn}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-serif text-stone-900 group-hover:text-[#064E3B] transition-colors mt-1">
                  {teacher.nameBn}
                </h3>
                <p className="text-xs font-semibold text-amber-800 mb-3">
                  {teacher.designationBn}
                </p>

                <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200/60 pt-3">
                  <div>
                    <span className="text-stone-400 block text-[11px]">যোগ্যতা:</span>
                    <span className="font-medium text-stone-800">{teacher.qualificationBn}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">বিশেষজ্ঞতা:</span>
                    <span className="font-medium text-emerald-900">{teacher.specializationBn}</span>
                  </div>
                </div>
              </div>

              {/* Bio summary */}
              <div className="mt-4 pt-3 border-t border-stone-200/60 text-xs text-stone-600 italic">
                &ldquo;{teacher.bioBn}&rdquo;
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Safety Note */}
        <div className="mt-12 bg-amber-50/80 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-800 shrink-0" />
            <p className="text-xs sm:text-sm text-stone-700">
              <strong>নিরাপত্তা ও প্রাইভেসি:</strong> নারী ও শিশু শিক্ষার্থীদের ক্লাস সম্পূর্ণ পর্দানশীন পরিবেশে পরিচালিত হয়। কোনো ক্যামেরা অন রাখা বাধ্যতামূলক নয়।
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-900 bg-white px-3 py-1.5 rounded-lg border border-amber-300 shadow-xs shrink-0">
            ১০০% নিরাপদ দ্বীনি পরিবেশ
          </div>
        </div>
      </div>
    </section>
  );
};
