import { Resend } from 'resend'

const FROM = process.env.RESEND_FROM_EMAIL ?? 'Elite IP <noreply@eliteip.ae>'
const PORTAL_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eliteip.ae'

function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendMatterUpdateEmail({
  to,
  clientName,
  matterTitle,
  updateTitle,
  updateBody,
}: {
  to: string
  clientName: string
  matterTitle: string
  updateTitle: string
  updateBody: string
}) {
  const resend = getResend()
  if (!resend) return

  await resend.emails.send({
    from: FROM,
    to,
    subject: `Update on your matter: ${matterTitle}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0A1E20;">
        <div style="background: #0A1E20; padding: 2rem; text-align: center;">
          <p style="color: #B8A882; font-size: 1.4rem; font-weight: 300; letter-spacing: 0.12em; margin: 0; font-family: Georgia, serif;">ELITE IP</p>
          <p style="color: rgba(233,233,223,0.4); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; margin: 0.4rem 0 0; font-family: Arial, sans-serif;">Intellectual Property Law</p>
        </div>
        <div style="padding: 2.5rem 2rem; background: #f9f9f7;">
          <p style="color: #555; margin: 0 0 1.5rem; font-family: Arial, sans-serif; font-size: 0.95rem;">Dear ${clientName},</p>
          <p style="color: #555; margin: 0 0 1.5rem; font-family: Arial, sans-serif; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em;">
            Re: ${matterTitle}
          </p>
          <h2 style="font-size: 1.3rem; font-weight: 400; margin: 0 0 1rem; color: #0A1E20; font-family: Georgia, serif;">${updateTitle}</h2>
          <hr style="border: none; border-top: 1px solid rgba(184,168,130,0.3); margin: 0 0 1.25rem;" />
          <p style="color: #444; line-height: 1.75; white-space: pre-wrap; font-family: Arial, sans-serif; font-size: 0.95rem; margin: 0 0 2rem;">${updateBody}</p>
          <a
            href="${PORTAL_URL}/portal/dashboard"
            style="display: inline-block; background: #0A1E20; color: #B8A882; text-decoration: none; padding: 0.75rem 1.5rem; font-family: Arial, sans-serif; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;"
          >
            View in Client Portal →
          </a>
        </div>
        <div style="background: #0A1E20; padding: 1.5rem 2rem; text-align: center;">
          <p style="color: rgba(233,233,223,0.3); font-size: 0.75rem; margin: 0; font-family: Arial, sans-serif;">
            © Elite IP. All rights reserved. · This email was sent because you have an active matter with Elite IP.
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendConsultationEmail({
  fullName,
  company,
  phone,
  email,
  issueType,
  urgency,
  details,
}: {
  fullName: string
  company?: string
  phone: string
  email: string
  issueType: string
  urgency: string
  details?: string
}) {
  const resend = getResend()
  if (!resend) return

  await resend.emails.send({
    from: FROM,
    to: process.env.CONTACT_EMAIL ?? 'hello@eliteip.ae',
    replyTo: email,
    subject: `[${urgency}] Consultation Request — ${issueType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A1E20;">New Consultation Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 0.5rem 0; color: #888; width: 120px;">Name</td><td style="padding: 0.5rem 0;">${fullName}</td></tr>
          <tr><td style="padding: 0.5rem 0; color: #888;">Company</td><td style="padding: 0.5rem 0;">${company ?? 'N/A'}</td></tr>
          <tr><td style="padding: 0.5rem 0; color: #888;">Phone</td><td style="padding: 0.5rem 0;">${phone}</td></tr>
          <tr><td style="padding: 0.5rem 0; color: #888;">Email</td><td style="padding: 0.5rem 0;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 0.5rem 0; color: #888;">Issue</td><td style="padding: 0.5rem 0;">${issueType}</td></tr>
          <tr><td style="padding: 0.5rem 0; color: #888;">Urgency</td><td style="padding: 0.5rem 0; font-weight: bold; color: ${urgency === 'Urgent' ? '#c0392b' : '#0A1E20'};">${urgency}</td></tr>
        </table>
        ${details ? `<hr style="margin: 1rem 0;" /><p style="color: #333;">${details}</p>` : ''}
      </div>
    `,
  })
}