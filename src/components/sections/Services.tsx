import { useTranslations } from "next-intl";
import { ArrowRight, Sun, Thermometer, Zap } from "lucide-react";

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      id: "solar",
      icon: <Sun className="w-6 h-6" />,
      title: t("solar.title"),
      desc: t("solar.description")
    },
    {
      id: "hvac",
      icon: <Thermometer className="w-6 h-6" />,
      title: t("hvac.title"),
      desc: t("hvac.description")
    },
    {
      id: "electrical",
      icon: <Zap className="w-6 h-6" />,
      title: t("electrical.title"),
      desc: t("electrical.description")
    }
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {t("title")}
            </h2>
            <p className="text-neutral-500 mt-4 max-w-xl font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              {t("description")}
            </p>
          </div>
          <a 
            href="#contact" 
            className="px-6 py-3 rounded-full border border-neutral-200 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 whitespace-nowrap"
          >
            {t("getQuote")}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className={`group relative p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700`}
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900 font-heading tracking-tight">{service.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-light">{service.desc}</p>
              <a href="#contact" className="text-primary text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                {t("learnMore")} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
