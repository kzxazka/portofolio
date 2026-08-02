import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Konfigurasi transporter (gunakan email Anda)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: false,
        auth: {
        user: process.env.EMAIL_USER, // Ganti dengan email Anda
        pass: process.env.EMAIL_PASSWORD, // Ganti dengan App Password
      },
    });

    // Konfigurasi email
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO, // Email tujuan
      subject: `Pesan Baru dari ${name}`,
      text: message,
      html: `
        <h3>Pesan Baru dari ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email berhasil dikirim!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Gagal mengirim email' },
      { status: 500 }
    );
  }
}