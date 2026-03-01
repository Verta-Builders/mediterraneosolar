import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
  const t = useTranslations("Legal");

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 font-light text-neutral-600 leading-relaxed text-sm md:text-base">
        <h1 className="text-4xl font-bold font-heading text-neutral-900 mb-8">{t("privacyTitle")}</h1>
        <div dangerouslySetInnerHTML={{ __html: t("privacyContent") }} />
        
        {/* Extended boilerplate text for legal page */}
        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">1. Identidad del responsable</h2>
        <p className="mb-6">
          Los datos personales recogidos en esta web serán tratados por Mediterraneo Solar, con domicilio en Partida Alzabaras Bajo, 1127A, 03290 Elx, Alicante, España, y correo electrónico: info.mediterraneosolar@gmail.com.
        </p>
        
        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">2. Finalidad del tratamiento</h2>
        <p className="mb-6">
          Los datos personales que recopilamos a través de nuestros formularios de contacto, u otros canales de comunicación, se utilizan exclusivamente para:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Atender su solicitud o consulta.</li>
          <li>Enviarle presupuestos o información sobre nuestros servicios de instalación de placas solares, climatización y electricidad.</li>
          <li>Gestionar la relación comercial en caso de contratación.</li>
        </ul>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">3. Conservación de los datos</h2>
        <p className="mb-6">
          Los datos proporcionados se conservarán mientras se mantenga la relación comercial, o durante los años necesarios para cumplir con las obligaciones legales.
        </p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">4. Legitimación</h2>
        <p className="mb-6">
          La base legal para el tratamiento de sus datos es el consentimiento expreso del usuario manifestado mediante la aceptación de esta Política de Privacidad y el envío del formulario.
        </p>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mt-12 mb-4">5. Derechos del usuario</h2>
        <p className="mb-6">
          Cualquier persona tiene derecho a obtener confirmación sobre si en Mediterraneo Solar estamos tratando datos personales que les conciernan. Usted tiene derecho a ejercer los siguientes derechos:
        </p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Derecho de acceso, rectificación y supresión de sus datos.</li>
          <li>Derecho de limitación y oposición al tratamiento de sus datos.</li>
          <li>Derecho a la portabilidad de sus datos.</li>
        </ul>
        <p className="mb-12">
          Puede ejercer estos derechos enviando un correo a info.mediterraneosolar@gmail.com.
        </p>
      </div>
    </div>
  );
}
