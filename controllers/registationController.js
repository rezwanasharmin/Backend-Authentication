const RegistrationModel = require('../models/registationModel');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');

let registrationController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // ১. ইমেইল আগে থেকেই ডাটাবেজে আছে কিনা চেক করা (Duplicate Email Check)
        let existingEmail = await RegistrationModel.findOne({ email: email });
        if (existingEmail) {
            return res.send('Email already exists, please use a different email');
        }

        // ২. পাসওয়ার্ড হ্যাশ করা (Password Hashing with bcryptjs)
        let hash = bcrypt.hashSync(password, 10);

        // ৩. হ্যাশ করা পাসওয়ার্ড দিয়ে ইউজার সেভ করা
        const user = new RegistrationModel({
            username: username,
            email: email,
            password: hash
        });
        await user.save();

        // ৪. ইমেইল পাঠানোর ট্রান্সপোর্টার কনফিগারেশন (Nodemailer setup)
        // এখানে আপনার নিজস্ব জিমেইল ও অ্যাপ পাসওয়ার্ড বসিয়ে নিতে হবে
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "rezwanasharmin85@gmail.com",
                pass: "phwlbrckmzrtvzhz",
            },
        });

        // ইমেইল পাঠানো
        await transporter.sendMail({
            from: '"Verification Team" <rezwanasharmin85@gmail.com>',
            to: email, // যে ইউজার রেজিস্টার করেছে তার ইমেইলে যাবে
            subject: "Verify Your Email",
            text: `Hello ${username}, please verify your email.`,
            html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Verify Your Email</title></head><body style="margin:0;padding:0;background:#09090f;font-family:Arial,Helvetica,sans-serif;color:#fff"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#09090f;padding:40px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#12121c;border:1px solid #29263b;border-radius:18px"><tr><td align="center" style="padding:38px 24px 24px"><div style="display:inline-block;background:#211a39;color:#b69aff;font-size:28px;font-weight:700;padding:14px 18px;border-radius:14px">✓</div><h1 style="font-size:24px;letter-spacing:2px;margin:22px 0 8px;color:#fff">VERIFY YOUR EMAIL</h1><p style="font-size:11px;letter-spacing:3px;color:#a7a3b8;margin:0">ACCOUNT SECURITY</p></td></tr><tr><td style="padding:0 32px"><div style="height:1px;background:#302942"></div></td></tr><tr><td style="padding:30px 32px 12px"><h2 style="font-size:23px;color:#fff;margin:0 0 18px">Hey, ${username}</h2><p style="font-size:15px;line-height:1.8;color:#c3c0d0;margin:0">Please verify your email address to activate your account and access all the features.</p></td></tr><tr><td align="center" style="padding:28px 24px"><a href="#" style="display:inline-block;background:#8b5cf6;color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:16px 32px;border-radius:9px">Verify My Email &rarr;</a></td></tr><tr><td align="center" style="padding:0 28px 28px"><p style="font-size:12px;line-height:1.7;color:#a7a3b8;margin:0">This verification link expires in 15 minutes.</p></td></tr></table></td></tr></table></body></html>`,
        });

        res.send('User registered successfully & verification email sent');
    } catch (error) {
        // যদি ইমেইল পাঠাতে সমস্যা হয় (যেমন অ্যাপ পাসওয়ার্ড ভুল), কিন্তু ইউজার অলরেডি সেভ হয়ে গেছে
        res.send("Registration completed, but email sending failed: " + error.message);
    }
}

module.exports = registrationController;
