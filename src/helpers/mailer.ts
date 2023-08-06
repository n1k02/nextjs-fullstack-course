import nodemailer from 'nodemailer'

import User from '@/models/userModel'
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)


        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000 // 1h
                }
            )
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000 // 1h
                }
            )
        }


        // create transporter
        const transport = nodemailer.createTransport({

            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'nextjscourse',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: emailType === 'VERIFY'
                ? `<p>Click <a href="${process.env.DOMAIN}/email-verify?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a> to verify your email</p>`
                : `<p>Click <a href="${process.env.DOMAIN}/password-reset/new-password?token=${hashedToken}">${process.env.DOMAIN}/password-reset/new-password?token=${hashedToken}</a> to reset your password</p>`
        }

        return await transport.sendMail(mailOptions)

    } catch (e: any) {
        throw new Error(e.message)
    }
}


