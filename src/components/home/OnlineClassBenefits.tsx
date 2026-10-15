import React from 'react';
import { 
  UserCheck, 
  CalendarClock, 
  ShieldCheck, 
  MonitorPlay, 
  LineChart, 
  FileCheck, 
  Headphones,
  Globe2,
  Sparkles
} from 'lucide-react';

export const OnlineClassBenefits: React.FC = () => {
  const benefits = [
    {
      icon: UserCheck,
      title: '১-অন-১ সম্পূর্ণ ব্যক্তিগত পাঠদান',
      desc: 'কোনো বিশৃঙ্খলা বা ভিড় নেই। সম্পূর্ণ ক্লাসের পুরো সময় শিক্ষক শুধুই আপনার জন্য নিবেদিত থাকেন। ফলে পড়ায় মনোযোগ থাকে সর্বোচ্চ।'
    },
    {
      icon: CalendarClock,
      title: 'আপনার সুবিধাজনক ক্লাস শিডিউল',
      desc: 'সকাল, দুপুর, সন্ধ্যা কিংবা এশার পর—আপনার দৈনন্দিন কর্মব্যস্ততা বা কাজের ফাঁকে নিজের পছন্দের টাইমে ক্লাস বেছে নেওয়ার সুযোগ।'
    },
    {
      icon: ShieldCheck,
      title: 'পর্দানশীন মহিলা শিক্ষিকা ব্যবস্থা',
      desc: 'আমাদের মা-বোন ও শিশুদের জন্য রয়েছেন প্রশিক্ষণপ্রাপ্ত দক্ষ নারী হাফেজা ও মুয়াল্লিমা। শতভাগ শরীয়াহসম্মত ও নিরাপদ পরিবেশ নিশ্চিত।'
    },
    {
      icon: MonitorPlay,
      title: 'ডিজিটাল কালার কোডেড মুসহাফ',
      desc: 'Zoom বা Google Meet-এর মাধ্যমে স্ক্রিনে স্পষ্ট কালার কোডেড তাজবিদ কুরআন প্রদর্শন করে প্রতিটি হরকত ও মাখরাজ হাতে-কলমে অনুশীলন করানো হয়।'
    },
    {
      icon: Globe2,
      title: 'দেশ ও প্রবাসের যেকোনো প্রান্ত থেকে',
      desc: 'বাংলাদেশ, যুক্তরাজ্য, যুক্তরাষ্ট্র, মধ্যপ্রাচ্য কিংবা ইউরোপ—যেখানেই থাকুন না কেন, আপনার লোকাল টাইমজোনে ক্লাস করার সুবিধা।'
    },
    {
      icon: LineChart,
      title: 'সাপ্তাহিক মূল্যায়ন ও অগ্রগতি ট্র্যাকিং',
      desc: 'প্রতি সপ্তাহের অগ্রগতি ডায়েরি ও মাসিক মূল্যায়নের মাধ্যমে অভিভাবককে শিক্ষার্থীর উন্নতি সম্পর্কে নিয়মিত অবহিত করা হয়।'
    },
    {
      icon: Headphones,
      title: 'ক্লাস মিস হলে রিশিডিউল সুবিধা',
      desc: 'জরুরি কোনো কারণে ক্লাসে উপস্থিত হতে না পারলে পূর্বেই শিক্ষককে জানিয়ে অন্য কোনো সুবিধাজনক দিনে মেকআপ ক্লাস নেওয়ার সুযোগ।'
    },
    {
      icon: FileCheck,
      title: 'কোর্স সমাপ্তি সনদপত্র',
      desc: 'কোর্স সফলভাবে শেষ করার পর একাডেমি থেকে অফিসিয়াল ভেরিফাইড কোর্স সমাপনী প্রশংসাপত্র বা সার্টিফিকেট প্রদান।'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#022C22] text-white relative overflow-hidden">
      {/* Decorative Golden Arch Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-amber-300 text-xs font-bold border border-amber-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>আধুনিক দ্বীনি শিক্ষা ব্যবস্থা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white">
            FS Darul Quran-এ অনলাইন ক্লাসের বিশেষ সুবিধাসমূহ
          </h2>
          <p className="mt-3 text-emerald-100/80 text-sm sm:text-base leading-relaxed">
            প্রযুক্তির সর্বোচ্চ সদ্ব্যবহার করে পবিত্র কুরআনের সহিহ শিক্ষাকে প্রতিটি ঘরে ঘরে পৌঁছে দিতে আমাদের এই সুসংগঠিত আয়োজন।
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="bg-emerald-950/70 p-6 rounded-2xl border border-emerald-800/80 hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-900/80 text-amber-400 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors flex items-center justify-center mb-4 border border-emerald-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-base font-serif mb-2 group-hover:text-amber-200 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
