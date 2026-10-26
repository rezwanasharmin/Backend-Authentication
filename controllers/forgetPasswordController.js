const RegistrationModel = require('../models/registationModel');
const nodemailer = require('nodemailer');

const forgetPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await RegistrationModel.findOne({ email: email });

        if (!user) {
            return res.send("Not registered user, please register first");
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "rezwanasharmin85@gmail.com",
                pass: "phwlbrckmzrtvzhz",
            },
        });

        await transporter.sendMail({
            from: '"Security Team" <rezwanasharmin85@gmail.com>',
            to: email,
            subject: "Reset Your Password",
            text: `Hello ${user.username}, please use the reset password endpoint to update your password.`,
            html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Reset Your Password</title></head><body style="margin:0;padding:0;background:#09090f;font-family:Arial,Helvetica,sans-serif;color:#fff"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#09090f;padding:40px 12px"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#12121c;border:1px solid #29263b;border-radius:18px"><tr><td align="center" style="padding:38px 24px 24px"><div style="display:inline-block;background:#211a39;color:#b69aff;font-size:28px;font-weight:700;padding:14px 18px;border-radius:14px">🔒</div><h1 style="font-size:24px;letter-spacing:2px;margin:22px 0 8px;color:#fff">RESET YOUR PASSWORD</h1><p style="font-size:11px;letter-spacing:3px;color:#a7a3b8;margin:0">ACCOUNT SECURITY</p></td></tr><tr><td style="padding:0 32px"><div style="height:1px;background:#302942"></div></td></tr><tr><td style="padding:30px 32px 12px"><h2 style="font-size:23px;color:#fff;margin:0 0 18px">Hey, ${user.username}</h2><p style="font-size:15px;line-height:1.8;color:#c3c0d0;margin:0">We received a request to reset your password. Please use the reset password API to update your password.</p></td></tr><tr><td align="center" style="padding:28px 24px"><a href="#" style="display:inline-block;background:#8b5cf6;color:#fff;text-decoration:none;font-size:15px;font-weight:700;padding:16px 32px;border-radius:9px">Reset My Password &rarr;</a></td></tr><tr><td align="center" style="padding:0 28px 28px"><p style="font-size:12px;line-height:1.7;color:#a7a3b8;margin:0">If you did not request this, please ignore this email.</p></td></tr></table></td></tr></table></body></html>`
        });

        res.send("Password reset email sent successfully");
    } catch (error) {
        res.send("Error sending password reset email: " + error.message);
    }
};

module.exports = forgetPasswordController;
