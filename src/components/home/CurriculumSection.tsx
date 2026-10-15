import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Volume2, 
  Flame, 
  Heart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CurriculumSectionProps {
  onSelectCourse: (courseSlug?: string) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ onSelectCourse }) => {
  const steps = [
    {
      step: '০১',
      title: 'নূরানি ও মাখরাজ ফাউন্ডেশন',
      sub: 'Foundation & Alphabet',
      desc: 'আরবি ২৯টি হরফের বিশুদ্ধ উচ্চারণ, মাখরাজ ও সিফাত চিহ্নিতকরণ, হরকত, তানভীন ও জযমের ব্যবহারিক নিয়ম। সম্পূর্ণ শূন্য থেকে শুরু করা শিক্ষার্থীদের জন্য নির্ভুল ভিত্তি।',
      icon: Layers,
      highlight: '২৯টি মাখরাজ ও বিশুদ্ধ উচ্চারণ'
    },
    {
      step: '০২',
      title: 'শব্দ গঠন ও সাবলীল রিডিং',
      sub: 'Word Linking & Reading',
      desc: 'হরফগুলো জোড়া লাগিয়ে ছোট শব্দ ও বাক্য তৈরি, মাদ্দ ও লিনের নিয়ম, তাশদীদের ব্যবহার এবং বানান ছাড়া দেখে দেখে প্রাথমিক আয়াত পড়ার দক্ষতা অর্জন।',
      icon: BookOpen,
      highlight: 'সহজ বৈজ্ঞানিক পদ্ধতিতে শব্দ সংযোগ'
    },
    {
      step: '০৩',
      title: 'ইলমুত তাজবিদ ও সহিহ তিলাওয়াত',
      sub: 'Tajweed Mastery & Fluency',
      desc: 'নূন সাকিন, মীম সাকিন, গুন্নাহ, ক্বলক্বলাহ, ওয়াকফ ও ইবতিদার নিয়ম। বিশুদ্ধ সুর ও তারতীলের সাথে কুরআন তিলাওয়াত করার সম্পূর্ণ ব্যবহারিক মাশক।',
      icon: Volume2,
      highlight: 'রাসূলুল্লাহ (সা.)-এর সুন্নাহসম্মত তারতীল'
    },
    {
      step: '০৪',
      title: 'পূর্ণাঙ্গ নাজেরা, হিফজ ও আমল',
      sub: 'Nazera, Hifz & Sunnah Life',
      desc: 'সম্পূর্ণ ৩০ পারা কুরআন শুদ্ধভাবে খতম, নির্বাচিত সূরা বা পূর্ণ কুরআন হিফজের সুযোগ, এবং সাথে নামাজের সহিহ পদ্ধতি, দৈনন্দিন মাসনুন দোয়া ও জীবনঘনিষ্ঠ ইসলামিক জ্ঞান।',
      icon: Flame,
      highlight: 'হিফজুল কুরআন ও দৈনন্দিন সুন্নাহ'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>আমাদের ধারাবাহিক শিক্ষাক্রম</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            ধাপে ধাপে কুরআন শিক্ষার আন্তর্জাতিক মানসম্পন্ন সিলেবাস
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            প্রাথমিক হরফ চেনা থেকে শুরু করে তাজবিদ ও হিফজ সমাপন পর্যন্ত প্রতিটি স্তর বৈজ্ঞানিক ও পরীক্ষিত পদ্ধতিতে বিন্যস্ত করা হয়েছে।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i}
                className="relative bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-lg hover:border-emerald-600 transition-all group flex flex-col justify-between"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-amber-300 transition-colors flex items-center justify-center shadow-xs border border-emerald-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-serif font-black text-2xl text-emerald-900/30 group-hover:text-amber-600/60 transition-colors">
                    {st.step}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="font-bold text-stone-900 text-lg font-serif group-hover:text-[#064E3B] transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
                    {st.sub}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/60">
                  <span className="inline-block text-[11px] font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    ✓ {st.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
