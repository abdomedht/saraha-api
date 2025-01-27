import {EventEmitter} from 'node:events'
import { sendEmail } from '../email/email.js'
import jwt from 'jsonwebtoken'
import { generateToken } from '../token/token.js'

export const emailEvent= new EventEmitter()
emailEvent.on("sendEmail",async(data)=>{
const {email}= data 
//const emailToken = jwt.sign({ email }, process.env.EMAIL_SIGN, { expiresIn: '1h' });
const emailToken = generateToken({payload:{email},signature:process.env.EMAIL_SIGN,options:{expiresIn:'1h'}})
console.log(emailToken)
        const confirmationLink = `${process.env.BASE_URL}/confirm-email?token=${emailToken}`;

        const html = `
            <div style="text-align: center; font-family: Arial, sans-serif;">
                <h2>Welcome to Our Platform</h2>
                <p>Please confirm your email by clicking the link below:</p>
                <a href="${confirmationLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Confirm Email</a>
            </div>
        `;

        await sendEmail({ to: email, subject: 'Confirm Your Email', html });
})