import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'অনলাইন ক্লাসে যুক্ত হতে আমার কী কী প্রয়োজন হবে?',
      a: 'একটি সাধারণ স্মার্টফোন, ট্যাবলেট অথবা ল্যাপটপ/কম্পিউটার এবং একটি স্থিতিশীল ইন্টারনেট সংযোগ। ক্লাস পরিচালনার জন্য আমরা Google Meet অথবা Zoom ব্যবহার করি, যা চালানো অত্যন্ত সহজ।'
    },
    {
      q: 'মা-বোন এবং ছোট বাচ্চাদের জন্য কি আলাদা নারী শিক্ষিকার ব্যবস্থা আছে?',
      a: 'হ্যাঁ, আলহামদুলিল্লাহ! আমাদের একাডেমিতে নারী শিক্ষার্থী এবং ছোট সোনামণিদের জন্য অভিজ্ঞ ও সার্টিফাইড মহিলা হাফেজা ও মুয়াল্লিমা রয়েছেন। সম্পূর্ণ ইসলামিক পর্দা ও ধর্মীয় মর্যাদা রক্ষা করে ক্লাস নেওয়া হয়।'
    },
    {
      q: 'অনলাইন ক্লাসে ভর্তির প্রক্রিয়া কী?',
      a: 'ওয়েবসাইটে অনলাইনে আবেদন ফর্মটি পূরণ করার পর আমাদের একাডেমি প্রতিনিধি আপনার সাথে সরাসরি ফোনে বা হোয়াটসঅ্যাপে যোগাযোগ করবেন। আপনার সুবিধাজনক সময় ও শিক্ষক নির্ধারণ করে নিয়মিত ক্লাস শুরু করা হবে।'
    },
    {
      q: 'আমি পূর্ণ বয়স্ক এবং আগে কখনো আরবি পড়িনি, আমি কি শিখতে পারব?',
      a: 'অবশ্যই ইনশাআল্লাহ! আমাদের অনেক শিক্ষার্থী রয়েছেন যারা ২০, ৩০, ৪০ বা তদূর্ধ্ব বয়সে এসে একদম শূন্য থেকে শুরু করেছেন। ১-অন-১ ক্লাসে কোনো জড়তা বা লজ্জা থাকে না, শিক্ষক অত্যন্ত স্নেহ ও ধৈর্যের সাথে হরফ থেকে শুরু করেন।'
    },
    {
      q: 'প্রবাসী শিক্ষার্থীরা কীভাবে সময় সমন্বয় করবেন?',
      a: 'যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, অস্ট্রেলিয়া কিংবা মধ্যপ্রাচ্যের শিক্ষার্থীদের সুবিধার জন্য আমরা তাদের স্থানীয় সময় অনুযায়ী সকাল, সন্ধ্যা বা ছুটির দিনে ক্লাস নির্ধারণ করে থাকি।'
    },
    {
      q: 'ক্লাস ফি বা হাদিয়া কীভাবে পরিশোধ করা যাবে?',
      a: 'ভর্তি নিশ্চিত হওয়ার পর বাংলাদেশের শিক্ষার্থীরা বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে এবং প্রবাসী ভাই-বোনেরা আন্তর্জাতিক রেমিট্যান্স বা পারস্পরিক সুবিধাজনক মাধ্যমে হাদিয়া প্রদান করতে পারবেন।'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>সাধারণ জিজ্ঞাসা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            প্রায়শই জিজ্ঞাসিত প্রশ্নোত্তর (FAQ)
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            আপনার মনে থাকা সাধারণ প্রশ্নগুলোর সহজ উত্তর নিচে তুলে ধরা হলো।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-sm sm:text-base hover:text-[#064E3B] cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                      ?
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 pl-12 bg-emerald-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
