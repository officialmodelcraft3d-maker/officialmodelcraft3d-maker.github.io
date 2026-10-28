// Model Craft 3D — Node.js server
// Serves the static site from /public and handles the quote form at POST /api/quote.
// Email is sent through Gmail SMTP when SMTP_USER and SMTP_PASS (a Gmail App Password) are set.
const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;
const TO = process.env.QUOTE_TO || 'Official.modelcraft3d@gmail.com';

app.disable('x-powered-by');
app.use(compression());
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));

// Long cache for media, short for HTML
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders(res, filePath) {
    if (/\.(jpg|jpeg|png|mp4|webp|svg|ico)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=600');
    }
  }
}));

app.post('/api/quote', async (req, res) => {
  const { name = '', email = '', country = '', service = '', message = '', website = '' } = req.body || {};
  if (website) return res.status(200).json({ ok: true }); // honeypot filled by bots
  if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please add your name and a valid email.' });
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(503).json({ ok: false, error: 'Email is not configured on the server yet.' });
  }
  try {
    const nodemailer = require('nodemailer');
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transport.sendMail({
      from: `"Model Craft 3D website" <${process.env.SMTP_USER}>`,
      to: TO,
      replyTo: email,
      subject: `New quote request — ${service || 'General'} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCountry: ${country}\nService: ${service}\n\n${message}`
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ ok: false, error: 'Could not send right now. Please use WhatsApp or email directly.' });
  }
});

app.get('/healthz', (req, res) => res.send('ok'));

app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));

app.listen(PORT, () => console.log(`Model Craft 3D running on http://localhost:${PORT}`));
