import React from 'react';
import { 
  HeartHandshake, 
  BookMarked, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle,
  Compass
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export const AboutSection: React.FC = () => {
  const { db } = useAcademy();

  const values = [
    {
      icon: BookMarked,
      title: 'কুরআন ও সহিহ সুন্নাহর অনুসারী',
      desc: 'পবিত্র কুরআন ও রাসূলুল্লাহ (সা.)-এর সহিহ সুন্নাহর আলোকবর্তিকা মানুষের মাঝে ছড়িয়ে দিয়ে আদর্শ ও তাকওয়াবান মুসলিম প্রজন্ম গড়ে তোলা।'
    },
    {
      icon: ShieldCheck,
      title: 'বিশুদ্ধ তাজবিদ ও খাঁটি মাখরাজ',
      desc: 'প্রতিটি আরবি হরফের উৎপত্তি স্থান (মাখরাজ) এবং অন্তর্নিহিত বৈশিষ্ট্য (সিফাত) পুঙ্খানুপুঙ্খভাবে তদারকি করে নিখুঁত তিলাওয়াত নিশ্চিতকরণ।'
    },
    {
      icon: HeartHandshake,
      title: 'স্নেহশীল ও ধৈর্যশীল পাঠদান',
      desc: 'শিক্ষার্থী শিশু হোক কিংবা বয়স্ক—ভয়ভীতিহীন ও মায়ামমতাময় পরিবেশে কুরআনকে ভালোবাসতে শেখানোই আমাদের শিক্ষাদানের মূলমন্ত্র।'
    },
    {
      icon: Compass,
      title: 'বিশ্বব্যাপী উম্মাহর সেবায় নিবেদিত',
      desc: 'দেশ ও প্রবাসের যেকোনো প্রান্ত থেকে দ্বীনি শিক্ষা অর্জনকে সহজ ও সুলভ করে সবার জন্য কুরআনের আলো পৌঁছে দেওয়া।'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative background Islamic geometry accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>আমাদের সম্পর্কে ও লক্ষ্য</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B] leading-tight">
              FS Darul Quran Online Academy — <br />
              <span className="text-amber-800">পবিত্র কুরআন শিক্ষার একটি নিবেদিত বিদ্যাপীঠ</span>
            </h2>

            <p className="text-stone-700 leading-relaxed text-sm sm:text-base text-justify">
              <strong>{db.siteSettings.academyNameBn}</strong> একটি অনলাইন ভিত্তিক আন্তর্জাতিক ইসলামিক শিক্ষা প্রতিষ্ঠান। আমাদের প্রধান স্লোগান হলো <em>&ldquo;{db.siteSettings.sloganEn}&rdquo;</em>—কুরআন ও সুন্নাহর ভিত্তিতে একটি সুন্দর ও আলোকিত উম্মাহ গঠন।
            </p>

            <p className="text-stone-600 leading-relaxed text-sm sm:text-base text-justify">
              ব্যস্ত জীবনের কারণে যারা মাদ্রাসায় গিয়ে কুরআন শেখার সুযোগ পান না, অথবা দূর প্রবাসে হালাল দ্বীনি পরিবেশ ও যোগ্য শিক্ষক খুঁজে পান না—তাদের জন্য আমরা নিয়ে এসেছি ঘরে বসেই সরাসরি যোগ্য শিক্ষকের সাথে ওয়ান-টু-ওয়ান ক্লাস করার বিশ্বমানের ব্যবস্থা। আমাদের প্রতিটি শিক্ষক দ্বীনি শিক্ষায় উচ্চ সনদপ্রাপ্ত এবং পাঠদানে সুদীর্ঘ অভিজ্ঞ।
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>ব্যক্তিগত গতি অনুযায়ী পাঠদান—কোনো তাড়াহুড়ো বা লজ্জা নেই</span>
              </div>
              <div className="flex items-center gap-3 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>বোন ও শিশুদের জন্য বিশেষায়িত পর্দানশীন শিক্ষিকা ব্যবস্থা</span>
              </div>
              <div className="flex items-center gap-3 text-stone-800 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>নামাজ, দৈনন্দিন মাসনুন দোয়া ও জরুরি মাসআলা শিক্ষার অন্তর্ভুক্তি</span>
              </div>
            </div>
          </div>

          {/* Right Highlights Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow hover:border-emerald-500 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#064E3B] group-hover:bg-[#064E3B] group-hover:text-amber-300 transition-colors flex items-center justify-center mb-3.5 border border-emerald-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base font-serif mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
