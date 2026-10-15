import React from 'react';
import { 
  FileEdit, 
  Headphones, 
  CalendarCheck, 
  Rocket, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdmissionProcessProps {
  onOpenAdmissionModal: () => void;
}

export const AdmissionProcess: React.FC<AdmissionProcessProps> = ({ onOpenAdmissionModal }) => {
  const steps = [
    {
      num: '১',
      title: 'অনলাইন আবেদন ফর্ম পূরণ',
      desc: 'আমাদের ওয়েবসাইটের সহজ ভর্তি ফর্মটি পূরণ করে সাবমিট করুন। আপনার পছন্দের কোর্স ও সুবিধাজনক সময় নির্বাচন করুন।',
      icon: FileEdit
    },
    {
      num: '২',
      title: 'যোগাযোগ ও প্রাথমিক মান যাচাই',
      desc: 'আমাদের একাডেমি প্রতিনিধি আপনার সাথে সরাসরি যোগাযোগ করে শিক্ষার্থীর বর্তমান কুরআনিক স্তর ও উপযুক্ত পাঠ্যক্রম নির্ধারণ করবেন।',
      icon: Headphones
    },
    {
      num: '৩',
      title: 'শিক্ষক ও শিডিউল নিশ্চিতকরণ',
      desc: 'শিক্ষার্থী বা অভিভাবকের সম্মতি ও সুবিধাজনক সময় অনুযায়ী উপযুক্ত স্থায়ী শিক্ষক ও সাপ্তাহিক দিন-সময় চূড়ান্ত করা হবে।',
      icon: CalendarCheck
    },
    {
      num: '৪',
      title: 'নিয়মিত ক্লাস ও কুরআন পাঠ শুরু',
      desc: 'অনুমোদন সম্পন্ন হওয়ার পর সরাসরি গুগল মিট বা জুমে আপনার নিয়মিত সহিহ কুরআন ও দ্বীনি শিক্ষার মোবারক যাত্রা শুরু হবে।',
      icon: Rocket
    }
  ];

  return (
    <section id="admission" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>সহজ ৪ ধাপের ভর্তি প্রক্রিয়া</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            কীভাবে খুব সহজেই ক্লাসে যুক্ত হবেন?
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            কোনো জটিলতা নেই—অনলাইনে আবেদন করার পর আমরাই আপনার সাথে হোয়াটসঅ্যাপ বা ফোনে যোগাযোগ করে ক্লাস শুরুর ব্যবস্থা করব।
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-amber-200/90 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#064E3B] flex items-center justify-center border border-emerald-200">
                      <Icon className="w-6 h-6 text-emerald-800" />
                    </div>
                    <span className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 font-black text-sm flex items-center justify-center shadow-xs">
                      {st.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base font-serif mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenAdmissionModal}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#043B2C] hover:to-[#065F46] shadow-lg hover:shadow-xl transition-all cursor-pointer text-sm sm:text-base border border-emerald-800 transform hover:-translate-y-0.5"
          >
            <span>এখনই ভর্তি ফর্ম পূরণ করুন</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
