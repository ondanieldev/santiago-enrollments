import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
    host: 'mail.colegiosantiago.com.br',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});
