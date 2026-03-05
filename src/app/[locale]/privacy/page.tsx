import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("Legal");

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 font-light text-neutral-600 leading-relaxed text-sm md:text-base">
        <h1 className="text-4xl font-bold font-heading text-neutral-900 mb-8">{t("privacyTitle")}</h1>
        <div dangerouslySetInnerHTML={{ __html: t("privacyContent") }} />
        
        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("privacyIdentidadTitle")}</h2>
        <p className="mb-6">{t("privacyIdentidadDesc")}</p>
        
        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("privacyFinalidadTitle")}</h2>
        <p className="mb-6">{t("privacyFinalidadDesc")}</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>{t("privacyFinalidadItem1")}</li>
          <li>{t("privacyFinalidadItem2")}</li>
          <li>{t("privacyFinalidadItem3")}</li>
        </ul>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("privacyConservacionTitle")}</h2>
        <p className="mb-6">{t("privacyConservacionDesc")}</p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("privacyLegitimacionTitle")}</h2>
        <p className="mb-6">{t("privacyLegitimacionDesc")}</p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("privacyDerechosTitle")}</h2>
        <p className="mb-6">{t("privacyDerechosDesc")}</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>{t("privacyDerechosItem1")}</li>
          <li>{t("privacyDerechosItem2")}</li>
          <li>{t("privacyDerechosItem3")}</li>
        </ul>
        <p className="mb-12">{t("privacyDerechosContact")}</p>
      </div>
    </div>
  );
}
