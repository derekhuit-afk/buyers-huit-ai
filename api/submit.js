import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { firstName, email, phone, stage } = req.body;
  if (!firstName || !email) return res.status(400).json({ error: 'Name and email required.' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'derekhuit@gmail.com', pass: process.env.GMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: '"Buyers Guide Lead" <derekhuit@gmail.com>',
    to: 'derekhuit@gmail.com',
    subject: `New Guide Request: ${firstName}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f7f9fc;border-radius:8px;">
      <div style="background:#0d1b2e;padding:24px 28px;border-radius:6px;margin-bottom:24px;">
        <h2 style="color:#fff;margin:0;font-size:20px;">New Guide Download Request</h2>
        <p style="color:#7ab8ff;margin:6px 0 0;font-size:13px;">buyers.huit.ai</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f2;color:#6b7a93;font-size:13px;width:140px;">Name</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f2;color:#1a2637;font-size:13px;font-weight:600;">${firstName}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f2;color:#6b7a93;font-size:13px;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f2;color:#2e8bff;font-size:13px;">${email}</td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #e2e8f2;color:#6b7a93;font-size:13px;">Phone</td>
            <td style="padding:10px 0;border-bottom:1px solid #e2e8f2;color:#1a2637;font-size:13px;">${phone || 'Not provided'}</td></tr>
        <tr><td style="padding:10px 0;color:#6b7a93;font-size:13px;">Stage</td>
            <td style="padding:10px 0;color:#1a2637;font-size:13px;">${stage || 'Not selected'}</td></tr>
      </table>
    </div>`,
  });

  return res.status(200).json({ success: true });
}
