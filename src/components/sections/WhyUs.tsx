import { useTranslations } from "next-intl";
import { CheckCircle2, ShieldCheck, Wrench, Leaf, Users, Zap } from "lucide-react";

export default function WhyUs() {
  const t = useTranslations("WhyUs");

  return (
    <section id="why-us" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16">
          <span className="text-green-600 font-bold tracking-widest text-xs uppercase mb-2 block">{t("tagline")}</span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 tracking-tight">{t("title")}</h2>
          <p className="text-neutral-500 mt-4 max-w-2xl text-lg font-light">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Large Card: Technical Service */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-green-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-200 transition-colors"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-neutral-900 mb-3">{t("technical.title")}</h3>
              <p className="text-neutral-500 leading-relaxed max-w-md font-light">{t("technical.description")}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-medium text-neutral-900">
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t("fullService.title")}</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t("rd.title")}</div>
              </div>
            </div>
          </div>

          {/* Tall Card: Sustainability */}
          <div className="md:row-span-2 bg-neutral-900 p-8 rounded-3xl border border-neutral-800 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-green-900/70 to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/10 text-green-400 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3">{t("sustainability.title")}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm font-light">{t("sustainability.description")}</p>
              </div>
              <div className="mt-8">
                <div className="text-5xl font-bold font-heading tracking-tight text-green-400 mb-1">
                  80<span className="text-2xl text-white">%</span>
                </div>
                <p className="text-neutral-400 text-xs uppercase tracking-wider font-semibold">{t("estimatedSavings")}</p>
              </div>
            </div>
          </div>

          {/* Small Card 1: Customer */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-green-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-200 transition-colors"></div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 mb-2">{t("customer.title")}</h3>
            <p className="text-sm font-light text-neutral-500">{t("customer.description")}</p>
          </div>

          {/* Small Card 2: Quality */}
          <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-64 bg-green-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-200 transition-colors"></div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-neutral-900 mb-2">{t("rd.title")}</h3>
            <p className="text-sm font-light text-neutral-500">{t("rd.description")}</p>
          </div>

        </div>
      </div>
    </section>
  );
}
