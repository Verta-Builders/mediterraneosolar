import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function About() {
  const t = useTranslations("About");

  const chapters = [
    {
      num: "01",
      title: t("ch1.title"),
      subtitle: t("ch1.subtitle"),
      desc: t("ch1.desc")
    },
    {
      num: "02",
      title: t("ch2.title"),
      subtitle: t("ch2.subtitle"),
      desc: t("ch2.desc")
    },
    {
      num: "03",
      title: t("ch3.title"),
      subtitle: t("ch3.subtitle"),
      desc: t("ch3.desc")
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="sticky top-32">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block animate-in fade-in slide-in-from-bottom-4 duration-700">
              {t("tagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-neutral-900 tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {t("title")}
            </h2>
            <p className="text-neutral-500 font-light leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              {t("description")}
            </p>
            <a 
              href="#contact" 
              className="text-neutral-900 font-semibold border-b border-neutral-300 hover:border-primary pb-1 inline-flex items-center gap-2 transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 group"
            >
              {t("cta")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative pl-8 border-l border-neutral-200 space-y-16">
            {chapters.map((chapter, idx) => (
              <div 
                key={chapter.num} 
                className="relative group animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${idx * 200}ms` }}
              >
                <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-neutral-200 group-hover:border-primary transition-colors"></span>
                <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100 group-hover:shadow-xl transition-all duration-300">
                  <span className="text-6xl font-bold font-heading text-neutral-200 absolute top-4 right-4 select-none opacity-50">{chapter.num}</span>
                  <h3 className="text-xl font-bold font-heading text-neutral-900 mb-2 relative z-10">{chapter.title}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{chapter.subtitle}</p>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">{chapter.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
