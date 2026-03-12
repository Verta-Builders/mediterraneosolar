"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, Loader2, Send } from "lucide-react";
import { sendEmail } from "@/actions/send-email";

export default function Contact() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t("title")}
          </h2>
          <p className="text-neutral-500 text-lg font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Info & Map */}
          <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">{t("info.labelAddress")}</h4>
                  <p className="text-neutral-500 font-light leading-relaxed">{t("info.address")}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">{t("info.labelPhone")}</h4>
                  <a href="tel:+34664419949" className="text-neutral-500 font-light hover:text-primary transition-colors">{t("info.phone")}</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-1">{t("info.labelEmail")}</h4>
                  <a href="mailto:info@mediterraneosolar.com" className="text-neutral-500 font-light hover:text-primary transition-colors">{t("info.email")}</a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-80 bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.843657731737!2d-0.7073114!3d38.26059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6237c56cdb98c3%3A0xe52631a0e1b9b9a!2sPtda.%20Alzabares%20Bajo%2C%201127A%2C%2003290%20Elche%2C%20Alicante%2C%20Spain!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mediterraneo Solar Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-neutral-200 shadow-xl shadow-black/5 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-neutral-900">{t("form.name")}</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
                  placeholder={t("form.name")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-neutral-900">{t("form.email")}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
                    placeholder={t("form.emailPlaceholder")}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-neutral-900">{t("form.phone")}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light"
                    placeholder={t("form.phonePlaceholder")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-neutral-900">{t("form.message")}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-light resize-none"
                  placeholder={t("form.message")}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> {t("form.submitting")}
                  </>
                ) : (
                  <>
                    {t("form.submit")} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-50 text-green-700 text-sm font-medium rounded-xl border border-green-200 text-center animate-in fade-in">
                  {t("form.success")}
                </div>
              )}
              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-700 text-sm font-medium rounded-xl border border-red-200 text-center animate-in fade-in">
                  {t("form.error")}
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
