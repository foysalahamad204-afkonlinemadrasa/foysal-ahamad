import { AcademyDatabase } from '../types';

export const initialAcademyData: AcademyDatabase = {
  siteSettings: {
    academyNameBn: 'FS Darul Quran Online Academy',
    academyNameEn: 'FS Darul Quran Online Academy',
    sloganBn: 'কুরআন | সুন্নাহ | সুন্দর উম্মাহ',
    sloganEn: 'Quran | Sunnah | Better Ummah',
    phone: '01300448147',
    email: 'ahamadfoysal920@gmail.com',
    whatsapp: '+8801300448147',
    addressBn: 'অনলাইন প্ল্যাটফর্ম (বাংলাদেশ, যুক্তরাজ্য, যুক্তরাষ্ট্র, মধ্যপ্রাচ্য ও বিশ্বব্যাপী)',
    announcementBn: 'নতুন সেশনের জন্য বিশেষ ভর্তি চলছে! সহিহ কুরআন ও তাজবিদ শিখতে আজই আবেদন করুন।',
    facebookUrl: 'https://facebook.com',
    youtubeUrl: 'https://youtube.com',
    bannerSubtitleBn: 'সহিহ তাজবিদ, বিশুদ্ধ মাখরাজ ও আন্তরিক যত্নে ঘরে বসেই কুরআন শিক্ষার এক বিশ্বস্ত আন্তর্জাতিক একাডেমি।',
    adminPasswordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'
  },
  courses: [
    {
      id: 'course-noorani',
      titleBn: 'নূরানি ও কুরআন শিক্ষার প্রাথমিক কোর্স',
      titleEn: 'Noorani & Basic Quran Reading',
      slug: 'noorani-basic-quran',
      category: 'basic',
      shortDescBn: 'সম্পূর্ণ শূন্য থেকে আরবি হরফের সঠিক উচ্চারণ ও কুরআন পড়ার সহজ পদ্ধতি।',
      shortDescEn: 'Learn Arabic letters and basic Quran reading from scratch.',
      fullDescBn: 'যারা আরবি বর্ণমালা জানেন না বা একদম প্রথম থেকে কুরআন শিক্ষা শুরু করতে চান, তাদের জন্য এই কোর্স। সহজ ও বৈজ্ঞানিক পদ্ধতিতে নূরানি কায়দা শিখিয়ে কুরআন তিলাওয়াতের উপযুক্ত করে গড়ে তোলা হয়। শিশু এবং যেকোনো বয়সের প্রাপ্তবয়স্কদের জন্য আলাদা ব্যাচের ব্যবস্থা রয়েছে।',
      durationBn: '৩ মাস',
      classesPerWeekBn: 'সপ্তাহে ৩ দিন',
      classDurationBn: '৩০ - ৪০ মিনিট',
      classTypeBn: '১-অন-১ ওয়ান টু ওয়ান অথবা ছোট ব্যাচ',
      monthlyFeeBn: '১,২০০ ৳ / মাস (প্রবাসী আলোচনা সাপেক্ষে)',
      admissionFeeBn: 'ফ্রি / আলোচনা সাপেক্ষে',
      teacherNameBn: 'অভিজ্ঞ ক্বারী ও নূরানি বিশেষজ্ঞ',
      suitableForBn: 'শিশু, কিশোর ও প্রাপ্তবয়স্ক নতুন শিক্ষার্থী',
      curriculumBn: [
        'আরবি ২৯টি হরফের শুদ্ধ মাখরাজ ও উচ্চারণ',
        'হরকত ও তানভীনের পরিচয় ও ব্যবহার',
        'মাদ্দের হরফ ও মদের প্রকারভেদ',
        'জযম ও তাশদীদের নিয়ম',
        'শব্দ জোড়া লাগানো ও রিডিং পড়া',
        'ছোট ছোট আয়াত বানান ছাড়া সাবলীল তিলাওয়াত'
      ],
      featuresBn: [
        'ওয়ান-টু-ওয়ান আন্তরিক যত্ন',
        'ডিজিটাল কায়দা স্ক্রিন শেয়ারিং',
        'মহিলা শিক্ষার্থীদের জন্য মহিলা শিক্ষিকা',
        'নমনীয় ক্লাস সময়সূচি'
      ],
      isActive: true,
      featured: true
    },
    {
      id: 'course-sahih-tilawat',
      titleBn: 'সহিহ কুরআন তিলাওয়াত কোর্স',
      titleEn: 'Sahih Quran Recitation Course',
      slug: 'sahih-quran-recitation',
      category: 'tajweed',
      shortDescBn: 'কুরআন পড়তে পারেন কিন্তু অশুদ্ধ? বিশুদ্ধ উচ্চারণ ও মধুর সুরে তিলাওয়াত শিখুন।',
      shortDescEn: 'Correct your recitation mistakes and learn melodious Quranic pronunciation.',
      fullDescBn: 'অনেকেই শৈশবে কুরআন শিখেছিলেন কিন্তু দীর্ঘদিন চর্চা না থাকায় বা ভুল শেখার কারণে সহিহভাবে পড়তে পারেন না। এই কোর্সের মাধ্যমে প্রতিটি আয়াতের মাখরাজ, ওয়াকফ এবং সহিহ নিয়ম হাতে-কলমে শুধরে দেওয়া হয়।',
      durationBn: '৩ থেকে ৪ মাস',
      classesPerWeekBn: 'সপ্তাহে ৩ দিন',
      classDurationBn: '৪০ মিনিট',
      classTypeBn: '১-অন-১ ওয়ান টু ওয়ান',
      monthlyFeeBn: '১,৫০০ ৳ / মাস',
      admissionFeeBn: 'ফ্রি',
      teacherNameBn: 'সার্টিফাইড ক্বারী সাহেব',
      suitableForBn: 'ছাত্র-ছাত্রী, চাকরিজীবী ও গৃহিণী',
      curriculumBn: [
        'প্রত্যেক অক্ষরের সুনির্দিষ্ট মাখরাজ সংশোধন',
        'কমন ভুলের তালিকা এবং তা দূরীকরণের কৌশল',
        'সূরা আল-ফাতিহা ও শেষ দশকের সূরাসমূহের নিখুঁত মাশক',
        'ওয়াকফের স্থান ও সঠিক দম নেওয়ার পদ্ধতি',
        'সুন্দর সুরে ও ধীরস্থিরভাবে কুরআন তিলাওয়াত'
      ],
      featuresBn: [
        'প্রতিটি তিলাওয়াত রেকর্ডিং ফিডব্যাক',
        'ভুল চিহ্নিতকরণ ও নিয়মিত ফলোআপ',
        'বিশেষ অডিও গাইডলাইন'
      ],
      isActive: true,
      featured: true
    },
    {
      id: 'course-nazera',
      titleBn: 'নাজেরা কুরআন কোর্স',
      titleEn: 'Nazera Quran Recitation',
      slug: 'nazera-quran',
      category: 'basic',
      shortDescBn: 'সম্পূর্ণ ৩০ পারা কুরআন দেখে দেখে দ্রুত ও নির্ভুলভাবে খতম করার কোর্স।',
      shortDescEn: 'Complete reading of the full 30 Juz with accuracy and fluency.',
      fullDescBn: 'যাঁরা হরফ ও বানান পারেন কিন্তু সাবলীলভাবে নাজেরা পড়তে পারেন না, তাঁদের পুরো কুরআনুল কারীম ধাপে ধাপে শিক্ষককে শুনিয়ে শুনিয়ে শেষ করানো হয়। এতে কুরআন তিলাওয়াতে পরিপূর্ণ আত্মবিশ্বাস জন্ম নেয়।',
      durationBn: '৬ মাস (শিক্ষার্থীর অগ্রগতির ওপর নির্ভরশীল)',
      classesPerWeekBn: 'সপ্তাহে ৪ দিন',
      classDurationBn: '৪০ মিনিট',
      classTypeBn: '১-অন-১ ব্যক্তিগত ক্লাস',
      monthlyFeeBn: '১,৮০০ ৳ / মাস',
      admissionFeeBn: 'ফ্রি',
      teacherNameBn: 'হাফেজে কুরআন ও কারী',
      suitableForBn: 'হিফজে প্রবেশের প্রস্তুতিশীল শিক্ষার্থী ও সাধারণ শিক্ষার্থী',
      curriculumBn: [
        '১ম পারা থেকে ৩০তম পারা ধারাবাহিকভাবে শিক্ষকের সামনে পাঠ',
        'দৈনিক সবক, সাতসবক ও আমুখতার আদলে নিয়মিত অনুশীলন',
        'কঠিন শব্দগুলোর বানান ও উচ্চারণ সমাধান',
        'পূর্ণ কুরআন খতম ও খতমের দোয়া'
      ],
      featuresBn: [
        'দৈনিক পৃষ্ঠাভিত্তিক অগ্রগতি ট্র্যাকিং',
        'অভিভাবকের জন্য নিয়মিত প্রগ্রেস রিপোর্ট',
        'কুরআন খতম সনদপত্র'
      ],
      isActive: true,
      featured: true
    },
    {
      id: 'course-tajweed',
      titleBn: 'ইলমুত তাজবিদ (তাজবিদ শিক্ষা)',
      titleEn: 'Ilm-ut-Tajweed Mastery',
      slug: 'ilm-ut-tajweed',
      category: 'tajweed',
      shortDescBn: 'তাজবীদের তাত্ত্বিক ও ব্যবহারিক নিয়মের ওপর পূর্ণাঙ্গ ও প্রফেশনাল কোর্স।',
      shortDescEn: 'Deep theoretical and practical knowledge of Tajweed rules.',
      fullDescBn: 'কুরআনকে আল্লাহ যেভাবে নাযিল করেছেন ঠিক সেভাবেই তিলাওয়াত করার জন্য তাজবিদ শিক্ষা অপরিহার্য। এই কোর্সে নূন সাকিন, মীম সাকিন, গুন্নাহ, ক্বলক্বলাহ, সিফাত ও মাখরাজের সব নিয়ম নিয়মসহ মাশক করানো হয়।',
      durationBn: '৪ মাস',
      classesPerWeekBn: 'সপ্তাহে ৩ দিন',
      classDurationBn: '৪৫ মিনিট',
      classTypeBn: '১-অন-১ ও স্পেশাল ব্যাচ',
      monthlyFeeBn: '১,৬০০ ৳ / মাস',
      admissionFeeBn: 'ফ্রি',
      teacherNameBn: 'আন্তর্জাতিক মানসম্পন্ন ক্বারী',
      suitableForBn: 'উন্নত তিলাওয়াতকামী যে কেউ',
      curriculumBn: [
        'মাখরাজ ও সিফাতে লাযিমাহ এবং আরেদাহ',
        'নূন সাকিন ও তানভীনের ৪টি বিধান',
        'মীম সাকিনের ৩টি বিধান',
        'মদ্দের প্রকার ও তাদের পরিমাণ',
        'র ও লাম পুর এবং বারীক করার নিয়ম',
        'রসমুল খত ও ওয়াকফের প্রতীকসমূহের ব্যবহার'
      ],
      featuresBn: [
        'কালার-কোডেড তাজবিদ কুরআন ব্যবহার',
        'ব্যবহারিক মাশক ও অডিও টেস্ট',
        'তাজবিদ সমাপ্তি সনদ'
      ],
      isActive: true,
      featured: true
    },
    {
      id: 'course-hifz',
      titleBn: 'হিফজুল কুরআন (পূর্ণাঙ্গ ও নির্বাচিত সূরা)',
      titleEn: 'Hifz-ul-Quran Program',
      slug: 'hifzul-quran-program',
      category: 'hifz',
      shortDescBn: 'ঘরে বসেই ব্যক্তিগত তত্ত্বাবধানে পবিত্র কুরআন মুখস্থ করার বিশেষায়িত প্রোগ্রাম।',
      shortDescEn: 'Memorize the Holy Quran or selected Surahs from home with master mentors.',
      fullDescBn: 'সম্পূর্ণ কুরআন হিফজ কিংবা নির্বাচিত গুরুত্বপূর্ণ সূরা (যেমন: সূরা ইয়াসিন, সূরা আর-রহমান, সূরা মুলক, সূরা কাহাফ, আম্মা পারা) মুখস্থ করার জন্য একটি নির্ভরযোগ্য প্ল্যাটফর্ম। অভিজ্ঞ হাফেজদের সরাসরি তত্ত্বাবধানে দৈনিক পড়া প্রদান ও পেছনের পড়া রিভিশনের আন্তর্জাতিক স্ট্যান্ডার্ড অনুসরণ করা হয়।',
      durationBn: '১ থেকে ৩ বছর (বা নির্বাচিত সূরার জন্য কাস্টম সময়)',
      classesPerWeekBn: 'সপ্তাহে ৫ দিন',
      classDurationBn: '৪৫ - ৬০ মিনিট',
      classTypeBn: '১-অন-১ ব্যক্তিগত ক্লাস',
      monthlyFeeBn: '২,৫০০ ৳ / মাস',
      admissionFeeBn: 'আলোচনা সাপেক্ষে',
      teacherNameBn: 'অভিজ্ঞ সিনিয়র হাফেজে কুরআন',
      suitableForBn: 'শিশু, কিশোর ও উৎসর্গিত শিক্ষার্থী',
      curriculumBn: [
        'দৈনিক নতুন সবক প্রদান ও নিখুঁত মুখস্থকরণ',
        'সাতসবক (সাম্প্রতিক সবকের রিভিশন)',
        'আমুক্তা (পূর্বের সকল পারার নিয়মিত দোর)',
        'মুতাশাবিহাত (অনুরূপ আয়াতের সতর্কতা ও চিহ্নিতকরণ)',
        'মাসিক হিফজ টেস্ট ও হিফজ সমাপনী সনদ'
      ],
      featuresBn: [
        'আন্তর্জাতিক মানের হিফজ পাঠদান পদ্ধতি',
        'দৈনিক অভিভাবক রিপোর্ট',
        'সার্টিফাইড শিক্ষক'
      ],
      isActive: true,
      featured: true
    },
    {
      id: 'course-masnoon-dua',
      titleBn: 'দৈনন্দিন মাসনুন দোয়া ও প্রয়োজনীয় ইসলামিক শিক্ষা',
      titleEn: 'Daily Masnoon Dua & Islamic Essentials',
      slug: 'masnoon-dua-islamic-essentials',
      category: 'general',
      shortDescBn: 'নামাজের সহিহ নিয়ম, জরুরি মাসআলা, দৈনন্দিন সুন্নাহ ও দোয়া শিক্ষা।',
      shortDescEn: 'Learn practical Salah, daily Sunnah duas, and fundamental Islamic teachings.',
      fullDescBn: 'একজন মুসলিমের দৈনন্দিন জীবনে যে বিষয়গুলো জানা ফরযে আইন—যেমন: তাহরাত (পবিত্রতা), অজু, গোসল, নামাজের সঠিক পদ্ধতি ও খুশু-খুজু, সকাল-সন্ধ্যার জিকির ও জরুরি মাসনুন দোয়া। বাস্তবসম্মত ও সহজ ব্যাখ্যার মাধ্যমে এই কোর্সটি সাজানো।',
      durationBn: '২ মাস',
      classesPerWeekBn: 'সপ্তাহে ২ দিন',
      classDurationBn: '৪৫ মিনিট',
      classTypeBn: '১-অন-১ অথবা গ্রুপ ব্যাচ',
      monthlyFeeBn: '১,০০০ ৳ / মাস',
      admissionFeeBn: 'ফ্রি',
      teacherNameBn: 'ইসলামিক স্টাডিজ আলেম ও মুয়াল্লিম',
      suitableForBn: 'সকল মুসলিম ভাই ও বোন',
      curriculumBn: [
        'অজু, তায়াম্মুম ও গোসলের সঠিক নিয়ম ও মাসআলা',
        'নামাজের ফরজ, ওয়াজিব, সুন্নাত ও সহিহ পদ্ধতি',
        'সকাল ও সন্ধ্যার সহিহ মাসনুন জিকিরসমূহ',
        'ঘুম, খাবার, ঘরে প্রবেশ ও ভ্রমণের গুরুত্বপূর্ণ দোয়া',
        'দৈনন্দিন জীবনের জরুরি হালাল-হারাম মাসআলা'
      ],
      featuresBn: [
        'পিডিএফ হ্যান্ডনোট প্রদান',
        'প্রশ্নোত্তর সেশন',
        'জীবনঘনিষ্ঠ আলোচনা'
      ],
      isActive: true,
      featured: false
    },
    {
      id: 'course-sisters-batch',
      titleBn: 'শিশু ও নারী বিশেষ কুরআন শিক্ষা ব্যাচ',
      titleEn: 'Special Kids & Sisters Batch',
      slug: 'kids-sisters-batch',
      category: 'special',
      shortDescBn: 'সম্পূর্ণ পর্দা রক্ষা করে অভিজ্ঞ মহিলা শিক্ষিকার তত্ত্বাবধানে ক্লাস।',
      shortDescEn: 'Dedicated female teachers for sisters and caring guidance for young kids.',
      fullDescBn: 'আমাদের বোন ও শিশুদের জন্য সম্পূর্ণ নিরাপদ ও পর্দানশীন পরিবেশে দক্ষ ও অভিজ্ঞ মহিলা শিক্ষিকাদের দ্বারা পাঠদান পরিচালিত হয়। শিশুদের মনস্তত্ত্ব বুঝে স্নেহের সাথে ও আনন্দের মাধ্যমে কুরআন শেখানো হয়।',
      durationBn: 'কোর্সের ধরন অনুযায়ী ৩-৬ মাস',
      classesPerWeekBn: 'সপ্তাহে ৩ দিন',
      classDurationBn: '৩০ - ৪০ মিনিট',
      classTypeBn: '১-অন-১ ওয়ান টু ওয়ান',
      monthlyFeeBn: '১,৪০০ ৳ / মাস',
      admissionFeeBn: 'ফ্রি',
      teacherNameBn: 'সার্টিফাইড মহিলা হাফেজা ও মুয়াল্লিমা',
      suitableForBn: 'ছোট শিশু (ছেলে/মেয়ে) ও যেকোনো বয়সের মুসলিমাহ',
      curriculumBn: [
        'শিশুদের উপযোগী বর্ণ ও ছড়ার মাধ্যমে হরফ শিক্ষা',
        'স্নেহশীল আচরণ ও আনন্দের সাথে উচ্চারণ সংশোধন',
        'ছোট ছোট সূরা ও আদব-আখলাক শিক্ষা',
        'বোনদের সুবিধাজনক ক্লাস শিডিউল'
      ],
      featuresBn: [
        '১০০% মহিলা শিক্ষিকা নিশ্চিত',
        'ক্যামেরা অফ রাখার পূর্ণ স্বাধীনতা',
        'নমনীয় ক্লাস শিডিউল'
      ],
      isActive: true,
      featured: true
    },
    {
      id: 'course-expats',
      titleBn: 'কর্মজীবী ও প্রবাসীদের জন্য ফ্লেক্সিবল কুরআন কোর্স',
      titleEn: 'Flexible Quran Course for Professionals & Expats',
      slug: 'professionals-expats-quran',
      category: 'special',
      shortDescBn: 'ব্যস্ত কর্মজীবন কিংবা প্রবাসের ভিন্ন টাইম জোনের সাথে মিলিয়ে আপনার সুবিধাজনক সময়ে ক্লাস।',
      shortDescEn: 'Tailored timings for busy schedules and international time zones worldwide.',
      fullDescBn: 'বাংলাদেশ, যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, অস্ট্রেলিয়া কিংবা মধ্যপ্রাচ্যে অবস্থানরত ভাই-বোনদের জন্য তাদের নিজস্ব সময় অনুযায়ী (সকাল, রাত বা ছুটির দিনে) স্পেশাল ওয়ান-টু-ওয়ান ক্লাস। ব্যস্ততার মধ্যেও নিয়মিত কুরআন চর্চা বজায় রাখার দারুণ সুযোগ।',
      durationBn: 'কাস্টমাইজড',
      classesPerWeekBn: 'সপ্তাহে ২-৩ দিন (পছন্দমতো)',
      classDurationBn: '৪০ মিনিট',
      classTypeBn: '১-অন-১ ব্যক্তিগত ক্লাস',
      monthlyFeeBn: 'আলোচনা সাপেক্ষে (দেশ ও কারেন্সি অনুযায়ী)',
      admissionFeeBn: 'ফ্রি',
      teacherNameBn: 'সিনিয়র আন্তর্জাতিক শিক্ষক',
      suitableForBn: 'প্রবাসে বসবাসকারী ও কর্মব্যস্ত মুসলিম ভাই-বোন',
      curriculumBn: [
        'ব্যক্তিগত মূল্যায়ন ভিত্তিক কাস্টমাইজড সিলেবাস',
        'সহিহ তিলাওয়াত ও প্রয়োজনীয় সুন্নাহ শিক্ষা',
        'ছুটির দিনে ক্লাস রিশিডিউলের সুবিধা'
      ],
      featuresBn: [
        'যেকোনো টাইম জোনে ক্লাস করার সুযোগ',
        'রেকর্ডেড ক্লাসের ব্যাকআপ সাপোর্ট',
        'জরুরি প্রয়োজনে ক্লাস রিশিডিউলিং'
      ],
      isActive: true,
      featured: false
    }
  ],
  teachers: [
    {
      id: 'teacher-1',
      nameBn: 'মাওলানা ক্বারী ফয়সাল আহমাদ',
      nameEn: 'Mawlana Qari Foysal Ahamad',
      designationBn: 'প্রতিষ্ঠাতা ও প্রধান শিক্ষক',
      qualificationBn: 'দাওরায়ে হাদিস (মাস্টার্স ইন ইসলামিক স্টাডিজ), তাহফিজুল কুরআন ও ক্বিরাআত সনদ',
      specializationBn: 'সহিহ তিলাওয়াত, ইলমুত তাজবিদ ও ইসলামিক শিক্ষা',
      experienceBn: '৮+ বছরের শিক্ষকতার অভিজ্ঞতা',
      gender: 'male',
      bioBn: 'পবিত্র কুরআনের সহিহ শিক্ষা প্রচার ও সুন্দর উম্মাহ গড়ার প্রত্যয়ে একনিষ্ঠভাবে নিবেদিতপ্রাণ শিক্ষক। দেশ ও বিদেশের বহু শিক্ষার্থী তাঁর কাছে সহিহ কুরআন শিক্ষা সম্পন্ন করেছেন।',
      isActive: true
    },
    {
      id: 'teacher-2',
      nameBn: 'হাফেজ ক্বারী মুহাম্মাদ উসমান',
      nameEn: 'Hafez Qari Muhammad Usman',
      designationBn: 'সিনিয়র হিফজ ও নাজেরা প্রশিক্ষক',
      qualificationBn: 'হাফেজে কুরআন ও আলিয়া মাদ্রাসা গ্র্যাজুয়েট',
      specializationBn: 'হিফজুল কুরআন, আমুক্তা ও নাজেরা',
      experienceBn: '৬+ বছরের অভিজ্ঞতা',
      gender: 'male',
      bioBn: 'শিশুদের অত্যন্ত যত্নের সাথে কুরআন হিফজ করানোর ক্ষেত্রে বিশেষ পারদর্শী ও ধৈর্যশীল শিক্ষক।',
      isActive: true
    },
    {
      id: 'teacher-3',
      nameBn: 'মুয়াল্লিমা ফাতিমা আক্তার (হাফেজা)',
      nameEn: 'Muallima Fatima Akter',
      designationBn: 'প্রধান মহিলা শিক্ষিকা (সিস্টার্স ও কিডস সেকশন)',
      qualificationBn: 'হাফেজা ও মুয়াল্লিমা প্রশিক্ষণ প্রাপ্তা',
      specializationBn: 'শিশু শিক্ষা, নূরানি কায়দা ও বোনদের কুরআন তিলাওয়াত',
      experienceBn: '৫+ বছরের অভিজ্ঞতা',
      gender: 'female',
      bioBn: 'বোনদের সম্পূর্ণ পর্দা বজায় রেখে ও ছোট সোনামণিদের মায়া-মমতা দিয়ে কুরআন শেখানোর জন্য সম্মানিত অভিভাবক মহলে অত্যন্ত প্রশংসিত।',
      isActive: true
    },
    {
      id: 'teacher-4',
      nameBn: 'কারী মাওলানা আবদুল্লাহ আল-মাহমুদ',
      nameEn: 'Qari Mawlana Abdullah Al-Mahmud',
      designationBn: 'তাজবিদ ও মাখরাজ বিশ্লেষক',
      qualificationBn: 'তাজবিদ ও ক্বিরাআতে স্পেশালাইজেশন',
      specializationBn: 'উচ্চতর তাজবিদ ও বয়স্কদের তিলাওয়াত সংস্কার',
      experienceBn: '৭+ বছরের অভিজ্ঞতা',
      gender: 'male',
      bioBn: 'বয়স্ক শিক্ষার্থী ও প্রবাসীদের কুরআন শুদ্ধ করার ক্ষেত্রে বিশেষ কৌশল ও সহজ বিশ্লেষণ পদ্ধতিতে পাঠদান করেন।',
      isActive: true
    }
  ],
  admissions: [
    {
      studentName: 'Nsbsbsb',
      guardianName: 'Znsndndbdb',
      phone: '01300448147',
      email: 'fyslahm28@gmail.com',
      age: '24',
      gender: 'female',
      countryCity: 'বাংলাদেশ',
      courseId: 'course-noorani',
      courseTitle: 'নূরানি ও কুরআন শিক্ষার প্রাথমিক কোর্স',
      currentLevel: 'হিফজ শুরু করতে চায়',
      preferredTime: 'প্রবাসী নিজস্ব টাইমজোন (আলোচনা সাপেক্ষে)',
      classType: 'small-group',
      additionalNotes: 'Bzbsnwjsbdbsjs',
      id: 'FSDQ-2026-2161',
      status: 'approved',
      createdAt: '2026-10-14T14:05:16.420Z',
      updatedAt: '2026-10-14T14:06:24.834Z'
    }
  ],
  notices: [
    {
      id: 'notice-1',
      titleBn: 'নতুন সেশনের জন্য বিশেষ ভর্তি আবেদন চলছে',
      contentBn: 'পবিত্র কুরআন শিক্ষা ও সহিহ তিলাওয়াত শিখতে আগ্রহী সকল শিক্ষার্থী ও অভিভাবকদের অবগতির জন্য জানানো যাচ্ছে যে, FS Darul Quran Online Academy-এর সকল কোর্সের জন্য অনলাইন আবেদন গ্রহণ চলছে। অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে সহিহ কুরআন শিখতে আজই অনলাইন ফর্ম পূরণ করে আপনার আসন নিশ্চিত করুন।',
      dateBn: '১৪ অক্টোবর ২০২৬',
      isPinned: true,
      targetAudience: 'all',
      createdAt: '2026-10-14T06:00:00Z'
    },
    {
      id: 'notice-2',
      titleBn: 'প্রবাসী শিক্ষার্থীদের জন্য বিশেষ টাইম-জোন সাপোর্ট চালু',
      contentBn: 'যুক্তরাজ্য, যুক্তরাষ্ট্র, কানাডা, অস্ট্রেলিয়া ও মধ্যপ্রাচ্যের শিক্ষার্থীদের সুবিধার জন্য স্থানীয় সময় অনুযায়ী ক্লাস শিডিউল সমন্বয় করার ব্যবস্থা করা হয়েছে। ভর্তি ফর্মে আপনার সুবিধাজনক সময় উল্লেখ করুন।',
      dateBn: '১০ অক্টোবর ২০২৬',
      isPinned: false,
      targetAudience: 'students',
      createdAt: '2026-10-10T12:00:00Z'
    },
    {
      id: 'notice-3',
      titleBn: 'মা-বোন ও শিশু শিক্ষার্থীদের জন্য সম্পূর্ণ আলাদা নারী শিক্ষিকা ব্যবস্থা',
      contentBn: 'আমাদের একাডেমিতে নারী শিক্ষার্থী এবং ছোট শিশুদের পাঠদানের জন্য অভিজ্ঞ সার্টিফাইড মহিলা হাফেজা ও মুয়াল্লিমা রয়েছেন। পূর্ণাঙ্গ পর্দা ও ধর্মীয় মর্যাদা রক্ষা করে ক্লাস পরিচালনা করা হয়।',
      dateBn: '০৮ অক্টোবর ২০২৬',
      isPinned: true,
      targetAudience: 'guardians',
      createdAt: '2026-10-08T09:00:00Z'
    }
  ],
  schedules: [
    {
      id: 'sched-1',
      courseId: 'course-noorani',
      courseNameBn: 'নূরানি ও কুরআন শিক্ষা (ব্যাচ ১ - শিশু)',
      teacherNameBn: 'মাওলানা ক্বারী ফয়সাল আহমাদ',
      daysBn: 'শনি, সোম, বুধ',
      timeSlotBn: 'বিকাল ৪:৩০ - ৫:১০',
      targetGroupBn: 'শিশু ও কিশোর ব্যাচ',
      liveClassLink: 'https://meet.google.com/fsd-kids-class1',
      isActive: true
    },
    {
      id: 'sched-2',
      courseId: 'course-sisters-batch',
      courseNameBn: 'সিস্টার্স কুরআন ব্যাচ (মহিলা শিক্ষিকা)',
      teacherNameBn: 'মুয়াল্লিমা ফাতিমা আক্তার (হাফেজা)',
      daysBn: 'রবি, মঙ্গল, বৃহস্পতি',
      timeSlotBn: 'সকাল ১০:০০ - ১০:৪৫',
      targetGroupBn: 'মহিলা ও বালিকা শিক্ষার্থী',
      liveClassLink: 'https://meet.google.com/fsd-sisters-live',
      isActive: true
    },
    {
      id: 'sched-3',
      courseId: 'course-sahih-tilawat',
      courseNameBn: 'সহিহ কুরআন তিলাওয়াত (কর্মজীবী নাইট ব্যাচ)',
      teacherNameBn: 'কারী মাওলানা আবদুল্লাহ আল-মাহমুদ',
      daysBn: 'শনি, সোম, বুধ',
      timeSlotBn: 'রাত ৯:৩০ - ১০:১৫',
      targetGroupBn: 'চাকরিজীবী ও প্রবাসীরা',
      liveClassLink: 'https://meet.google.com/fsd-night-batch',
      isActive: true
    }
  ],
  messages: []
};

