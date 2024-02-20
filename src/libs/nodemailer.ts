import { createTransport } from 'nodemailer'

export const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER_GMAIL,
    pass: process.env.AUTH_PASS_GMAIL,
  },
});