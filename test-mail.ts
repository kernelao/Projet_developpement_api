import { createTransport } from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

async function sendTestMail() {
  console.log('🔐 Identifiants utilisés :');
  console.log('ZOHO_USER:', process.env.ZOHO_USER);
  console.log('ZOHO_PASS:', process.env.ZOHO_PASS?.slice(0, 4) + '...');

  const transporter = createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Ovrkode Support" <contact@ovrkode.com>',
      to: 'adam.boulisfane212@gmail.com',
      subject: '✅ Test SMTP avec Zoho et STARTTLS',
      text: 'Yes ! Le mail est bien parti 🚀',
    });

    console.log('✅ Message envoyé ! ID :', info.messageId);
  } catch (error) {
    console.error('❌ Erreur SMTP :', error.message);
  }
}

sendTestMail();
