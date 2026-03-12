import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const t = useTranslations("FAQ");

  const faqs = [
    { value: "q1", q: t("q1.q"), a: t("q1.a") },
    { value: "q2", q: t("q2.q"), a: t("q2.a") },
    { value: "q3", q: t("q3.q"), a: t("q3.a") },
    { value: "q4", q: t("q4.q"), a: t("q4.a") },
  ];

  return (
    <section id="faq" className="py-32 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-3xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading text-neutral-900 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {t("title")}
          </h2>
          <p className="text-neutral-500 text-sm font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {t("description")}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={faq.value} 
              value={faq.value} 
              className="bg-white px-5 rounded-2xl border border-neutral-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <AccordionTrigger className="hover:no-underline font-medium text-neutral-900 text-left py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 font-light text-sm leading-relaxed pb-5 pt-0">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

      </div>
    </section>
  );
}
