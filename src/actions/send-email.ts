"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL || "info.mediterraneosolar@gmail.com";

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const data = await resend.emails.send({
      from: "Mediterraneo Solar Web <onboarding@resend.dev>", // Should be updated to a verified domain in production
      to: [TO_EMAIL],
      subject: `Nuevo mensaje de contacto web de: ${name}`,
      html: `
        <h2>Nuevo mensaje de Mediterraneo Solar (Web)</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Internal server error" };
  }
}
