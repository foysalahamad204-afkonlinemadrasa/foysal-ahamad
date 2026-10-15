import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useAcademy } from '../../context/AcademyContext';

export const ContactSection: React.FC = () => {
  const { db, submitContactMessage } = useAcademy();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং বার্তা লিখুন।');
      return;
    }

    try {
      setIsSubmitting(true);
      await submitContactMessage({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'সাধারণ অনুসন্ধান',
        message: formData.message.trim(),
      });
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrorMsg('বার্তা পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি ফোন করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/${db.siteSettings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('আসসালামু আলাইকুম। FS Darul Quran Online Academy সম্পর্কে জানতে চাই।')}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#064E3B] text-xs font-bold border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>যোগাযোগ করুন</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#064E3B]">
            যেকোনো প্রশ্ন বা পরামর্শের জন্য আমাদের সাথে কথা বলুন
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            কোর্সে ভর্তি, ক্লাসের সময় নির্ধারণ বা যেকোনো দ্বীনি জিজ্ঞাসায় আমরা সর্বদা আপনার পাশে আছি।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200/90 hover:border-emerald-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-emerald-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                    মোবাইল নম্বর (সরাসরি কল)
                  </h4>
                  <a
                    href={`tel:${db.siteSettings.phone}`}
                    className="text-lg font-bold text-[#064E3B] hover:text-amber-700 font-serif block"
                  >
                    {db.siteSettings.phone}
                  </a>
                  <p className="text-xs text-stone-500 mt-1">
                    সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত কল করা যাবে।
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200/90 hover:border-emerald-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-amber-800" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                    অফিসিয়াল ইমেইল
                  </h4>
                  <a
                    href={`mailto:${db.siteSettings.email}`}
                    className="text-sm sm:text-base font-bold text-[#064E3B] hover:text-amber-700 block break-all"
                  >
                    {db.siteSettings.email}
                  </a>
                  <p className="text-xs text-stone-500 mt-1">
                    যে কোনো প্রাতিষ্ঠানিক তথ্য বা পরামর্শের জন্য লিখুন।
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200/90 hover:border-emerald-500 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                    হোয়াটসঅ্যাপ সাপোর্ট
                  </h4>
                  <p className="text-xs text-stone-600 mb-2">
                    দ্রুত রিপ্লাই ও সরাসরি কথোপকথনের জন্য হোয়াটসঅ্যাপে মেসেজ দিন।
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Presence */}
            <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-amber-200">সার্বক্ষণিক অনলাইন একাডেমি</h4>
                  <p className="text-xs text-emerald-100/80 mt-1 leading-relaxed">
                    {db.siteSettings.addressBn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2] p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-sm">
            <h3 className="text-xl font-bold font-serif text-[#064E3B] mb-1">
              আমাদের একটি বার্তা পাঠান
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6">
              ফর্মটি পূরণ করে বার্তা পাঠালে আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।
            </p>

            {isSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950 font-serif">
                  আপনার বার্তা সফলভাবে গৃহীত হয়েছে!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800">
                  জাযাকুমুল্লাহু খায়রান। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব ইনশাআল্লাহ।
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="যেমন: মুহাম্মাদ আবদুল্লাহ"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      ইমেইল (যদি থাকে)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      বিষয়
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="যেমন: ভর্তি বা ফি সম্পর্কিত জিজ্ঞাসা"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    আপনার বিস্তারিত বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="আপনার প্রশ্ন বা মতামত বিস্তারিত লিখুন..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#064E3B] to-[#047857] hover:from-[#043B2C] hover:to-[#065F46] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-sm disabled:opacity-60"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>{isSubmitting ? 'বার্তা পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
