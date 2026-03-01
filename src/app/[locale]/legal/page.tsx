import { useTranslations } from "next-intl";

export default function LegalNotice() {
  const t = useTranslations("Legal");

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 font-light text-neutral-600 leading-relaxed text-sm md:text-base">
        <h1 className="text-4xl font-bold font-heading text-neutral-900 mb-8">{t("noticeTitle")}</h1>
        <div dangerouslySetInnerHTML={{ __html: t("noticeContent") }} />

        {/* Extended boilerplate text for legal page */}
        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">1. Datos Identificativos</h2>
        <p className="mb-6">
          En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), le informamos que el responsable web de este sitio es Mediterraneo Solar, con domicilio en:
        </p>
        <p className="mb-6 font-medium text-neutral-800">
          Partida Alzabaras Bajo, 1127A<br/>
          03290 Elx, Alicante, España<br/>
          Correo electrónico: info.mediterraneosolar@gmail.com<br/>
          Teléfono: +34 664 419 949
        </p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">2. Propiedad Intelectual e Industrial</h2>
        <p className="mb-6">
          Todos los contenidos de este sitio web, incluyendo textos, diseños, gráficos, logotipos, imágenes y código fuente, son propiedad exclusiva de Mediterraneo Solar o de terceros a los que se ha adquirido sus derechos de explotación, y están protegidos por la normativa sobre propiedad intelectual e industrial. 
        </p>
        <p className="mb-6">
          Queda expresamente prohibida la reproducción, distribución, comunicación pública y transformación, total o parcial, de dichos contenidos sin el consentimiento expreso y por escrito de Mediterraneo Solar.
        </p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">3. Exclusión de Garantías y Responsabilidad</h2>
        <p className="mb-6">
          Mediterraneo Solar no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
        </p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">4. Modificaciones</h2>
        <p className="mb-12">
          Mediterraneo Solar se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
        </p>
      </div>
    </div>
  );
}
