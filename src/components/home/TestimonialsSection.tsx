import React from 'react';
import { Quote, Star, Sparkles, MapPin } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'মুহাম্মাদ জহিরুল ইসলাম',
      location: 'মিরপুর, ঢাকা (অভিভাবক)',
      text: 'আমার ৯ বছরের ছেলের জন্য নূরানি ও সহিহ কুরআন কোর্সে ভর্তি করেছিলাম। আলহামদুলিল্লাহ, শিক্ষক অত্যন্ত ধৈর্যশীল ও মায়া নিয়ে পড়ান। এখন সে নিজেই উৎসাহ নিয়ে ক্লাসে বসে।',
      course: 'নূরানি ও কুরআন শিক্ষা'
    },
    {
      name: 'উম্মে কুলসুম',
      location: 'বার্মিংহাম, যুক্তরাজ্য (শিক্ষার্থী)',
      text: 'প্রবাসে থেকে একজন দ্বীনদার মহিলা শিক্ষিকার কাছে কুরআন শেখা আমার জন্য বড় নিয়ামত। তাজবীদের প্রতিটি নিয়ম তিনি সুন্দরভাবে ধরিয়ে দেন। জাযাকুমুল্লাহু খায়রান।',
      course: 'ইলমুত তাজবিদ কোর্স'
    },
    {
      name: 'ইঞ্জিনিয়ার আবদুল্লাহ আল-মাসুদ',
      location: 'রিয়াদ, সৌদি আরব (প্রবাসী)',
      text: 'অফিসের পর রাতে আমার স্থানীয় সময় অনুযায়ী ক্লাস করতে পারি। ওয়ান-টু-ওয়ান ক্লাস হওয়ায় ভুলগুলো শিক্ষক সাথে সাথে শুধরে দেন। FS Darul Quran একাডেমিকে আন্তরিক মোবারকবাদ।',
      course: 'সহিহ কুরআন তিলাওয়াত'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>শিক্ষার্থী ও অভিভাবকদের অনুভূতি</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            কুরআন শিক্ষার অভিজ্ঞতা ও মতামত
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            আলহামদুলিল্লাহ, শিক্ষার্থী ও অভিভাবকদের আন্তরিক দোয়াই আমাদের অগ্রযাত্রার সর্বশ্রেষ্ঠ প্রেরণা।
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-500/60 mb-3" />
                <p className="text-stone-700 text-sm leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm font-serif">{t.name}</h4>
                    <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      <span>{t.location}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {t.course}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
