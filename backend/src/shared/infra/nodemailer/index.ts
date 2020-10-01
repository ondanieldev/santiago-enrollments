import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'mail.colegiosantiago.com.br',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

export default transporter;
