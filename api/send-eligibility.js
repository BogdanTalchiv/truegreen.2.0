import nodemailer from 'nodemailer'

/** Escape HTML special chars to prevent injection in the email body */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Build a clean, readable HTML email table */
function buildHtml(rows) {
  const cells = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;background:#f6faf7;font-weight:600;color:#5a6360;white-space:nowrap;border-bottom:1px solid #e4ede6;border-right:1px solid #e4ede6;">${esc(label)}</td>
        <td style="padding:10px 16px;color:#1a2e1c;border-bottom:1px solid #e4ede6;">${esc(value)}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Eligibilidad TrueGreen</title></head>
<body style="margin:0;padding:24px;font-family:Arial,sans-serif;background:#f0f4f1;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#2e7d32,#1b5e20);padding:28px 32px;">
      <h1 style="margin:0;color:#fff;font-size:1.35rem;">Nueva solicitud de elegibilidad</h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:0.875rem;">TrueGreen Energy — programa CAE</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${cells}
    </table>
    <div style="padding:20px 32px;background:#f6faf7;color:#9aaba0;font-size:0.75rem;text-align:center;">
      Este mensaje fue generado automáticamente por truegreen.vercel.app
    </div>
  </div>
</body>
</html>`
}

export default async function handler(req, res) {
  /* CORS */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.error('[send-eligibility] SMTP_USER / SMTP_PASS not configured')
    return res.status(500).json({ message: 'Email service not configured' })
  }

  /* Parse body (Vercel sends it pre-parsed for JSON content-type) */
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {})

  const LABELS = {
    propertyType : 'Tipo de propiedad',
    area         : 'Superficie (m²)',
    yearBuilt    : 'Año de construcción',
    hasAttic     : 'Tiene desván',
    county       : 'Provincia',
    city         : 'Ciudad',
    postalCode   : 'Código postal',
    firstName    : 'Nombre',
    lastName     : 'Apellidos',
    phone        : 'Teléfono',
    email        : 'Correo electrónico',
    message      : 'Mensaje'
  }

  const rows = Object.entries(LABELS)
    .filter(([key]) => body[key] != null && body[key] !== '')
    .map(([key, label]) => [label, String(body[key])])

  const mailTo   = process.env.MAIL_TO   || 'talchivbogdan03@gmail.com'
  const mailFrom = process.env.MAIL_FROM || user

  const transporter = nodemailer.createTransport({
    host   : process.env.SMTP_HOST || 'smtp.gmail.com',
    port   : Number(process.env.SMTP_PORT || 587),
    secure : false,
    auth   : { user, pass }
  })

  const subject = `[TrueGreen] Elegibilidad — ${esc(body.firstName || '')} ${esc(body.lastName || '')}`.trim()

  try {
    await transporter.sendMail({
      from    : `"TrueGreen Web" <${mailFrom}>`,
      to      : mailTo,
      replyTo : body.email || mailFrom,
      subject,
      text    : rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html    : buildHtml(rows)
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[send-eligibility] sendMail error:', err)
    return res.status(500).json({ message: 'Failed to send email' })
  }
}
