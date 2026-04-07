import nodemailer from 'nodemailer'

/** Escape HTML special chars */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Build a clean, readable HTML email table */
function buildHtml(rows, senderName) {
  const cells = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:12px 20px;background:#f6faf7;font-weight:600;font-size:13px;color:#5a6360;white-space:nowrap;border-bottom:1px solid #e4ede6;border-right:1px solid #e4ede6;width:38%;">${esc(label)}</td>
        <td style="padding:12px 20px;font-size:13px;color:#1a2e1c;border-bottom:1px solid #e4ede6;">${esc(value)}</td>
      </tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Elegibilidad TrueGreen</title></head>
<body style="margin:0;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;background:#f0f4f1;">
  <div style="max-width:620px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.10);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1b5e20,#2e7d32);padding:32px 36px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <div style="width:40px;height:40px;background:rgba(255,255,255,0.15);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">🌿</div>
        <span style="color:rgba(255,255,255,0.9);font-size:13px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">TrueGreen Energy</span>
      </div>
      <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;line-height:1.3;">Nueva solicitud de elegibilidad</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">
        ${esc(senderName)} ha completado el formulario de elegibilidad
      </p>
    </div>

    <!-- Data table -->
    <table style="width:100%;border-collapse:collapse;">
      ${cells}
    </table>

    <!-- Footer -->
    <div style="padding:20px 36px;background:#f6faf7;border-top:1px solid #e4ede6;">
      <p style="margin:0;color:#9aaba0;font-size:12px;text-align:center;">
        Mensaje generado automáticamente · <a href="https://truegreen.vercel.app" style="color:#388e3c;text-decoration:none;">truegreen.vercel.app</a>
      </p>
    </div>

  </div>
</body>
</html>`
}

export default async function handler(req, res) {
  /* ── CORS ── */
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  /* ── SMTP credentials (set in Vercel Dashboard → Settings → Environment Variables) ── */
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpUser || !smtpPass) {
    console.error('[send-eligibility] SMTP_USER / SMTP_PASS are not configured in Vercel environment variables.')
    return res.status(500).json({
      message: 'Email service not configured. Set SMTP_USER and SMTP_PASS in Vercel → Settings → Environment Variables.'
    })
  }

  /* ── Parse body ── */
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body ?? {})

  /* ── Field labels (Spanish) ── */
  const LABELS = {
    propertyType : 'Tipo de propiedad',
    area         : 'Superficie (m²)',
    yearBuilt    : 'Año de construcción',
    hasAttic     : 'Tiene desván / buhardilla',
    county       : 'Provincia',
    city         : 'Ciudad',
    postalCode   : 'Código postal',
    firstName    : 'Nombre',
    lastName     : 'Apellidos',
    phone        : 'Teléfono',
    email        : 'Correo electrónico',
    message      : 'Mensaje adicional'
  }

  const rows = Object.entries(LABELS)
    .filter(([key]) => body[key] != null && body[key] !== '')
    .map(([key, label]) => [label, String(body[key])])

  const senderName = [body.firstName, body.lastName].filter(Boolean).join(' ') || 'Usuario'
  const mailTo     = process.env.MAIL_TO   || 'truegreenenergysl@gmail.com'
  const mailFrom   = process.env.MAIL_FROM || smtpUser

  /* ── Nodemailer transporter (Gmail via TLS on port 587) ── */
  const transporter = nodemailer.createTransport({
    host   : process.env.SMTP_HOST || 'smtp.gmail.com',
    port   : Number(process.env.SMTP_PORT || 587),
    secure : false,           // STARTTLS (not SSL port 465)
    auth   : { user: smtpUser, pass: smtpPass },
    tls    : {
      rejectUnauthorized: true  // enforce valid certs
    }
  })

  const subject = `[TrueGreen] Nueva solicitud — ${esc(senderName)}`

  try {
    await transporter.sendMail({
      from    : `"TrueGreen Web" <${mailFrom}>`,
      to      : mailTo,
      replyTo : body.email || mailFrom,
      subject,
      text    : rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html    : buildHtml(rows, senderName)
    })

    console.info(`[send-eligibility] Email sent successfully to ${mailTo} for ${senderName}`)
    return res.status(200).json({ ok: true })

  } catch (err) {
    console.error('[send-eligibility] sendMail error:', err.message)
    return res.status(500).json({ message: 'Failed to send email. Check SMTP credentials.' })
  }
}
