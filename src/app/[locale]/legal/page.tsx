import { useTranslations } from "next-intl";

export default function LegalNotice() {
  const t = useTranslations("Legal");

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 font-light text-neutral-600 leading-relaxed text-sm md:text-base">
        <h1 className="text-4xl font-bold font-heading text-neutral-900 mb-8">{t("noticeTitle")}</h1>
        <div dangerouslySetInnerHTML={{ __html: t("noticeContent") }} />

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("noticeDatosTitle")}</h2>
        <p className="mb-6">{t("noticeDatosDesc1")}</p>
        <p className="mb-6 font-medium text-neutral-800" dangerouslySetInnerHTML={{ __html: t("noticeDatosDesc2") }} />

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("noticePropiedadTitle")}</h2>
        <p className="mb-6">{t("noticePropiedadDesc1")}</p>
        <p className="mb-6">{t("noticePropiedadDesc2")}</p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("noticeGarantiasTitle")}</h2>
        <p className="mb-6">{t("noticeGarantiasDesc")}</p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">{t("noticeModificacionesTitle")}</h2>
        <p className="mb-12">{t("noticeModificacionesDesc")}</p>
      </div>
    </div>
  );
}
