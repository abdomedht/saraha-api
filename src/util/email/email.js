import nodemailer from 'nodemailer';
export const sendEmail = async ({ to = [], subject = "", text = "", html = "", attachments = [] } = {}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"hello from saraha app  👻" <maddison53@ethereal.email>',
        to,
        subject,
        text,
        html,
        attachments
    });

    console.log("Message sent: %s", info.messageId);

}

