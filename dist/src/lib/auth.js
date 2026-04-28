import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER",
                required: false,
            },
            phone: {
                type: "string",
                required: false,
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            try {
                // ✅ single clean verification link
                const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
                await transporter.sendMail({
                    from: '"FoodHub 🍔" <foodhub@gmail.com>',
                    to: user.email,
                    subject: "Verify your FoodHub account",
                    text: `Hi ${user.name || "there"}, verify your email: ${verificationUrl}`,
                    html: `
            <div style="font-family: Arial; background:#f6f8fa; padding:40px 0;">
              <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

                <div style="background:#ff6b35;padding:20px;text-align:center;">
                  <h1 style="color:#fff;margin:0;">FoodHub 🍔</h1>
                  <p style="color:#ffece4;margin:5px 0;">Fresh food, fast delivery</p>
                </div>

                <div style="padding:30px;color:#333;">
                  <h2>Verify your email</h2>

                  <p>Hi <strong>${user.name || "there"}</strong>,</p>

                  <p>Thanks for joining FoodHub! Please verify your email address.</p>

                  <div style="text-align:center;margin:30px 0;">
                    <a href="${verificationUrl}"
                      style="background:#ff6b35;color:#fff;padding:14px 28px;text-decoration:none;border-radius:6px;font-weight:bold;">
                      Verify Email
                    </a>
                  </div>

                  <p style="font-size:12px;color:#777;">
                    If button not working, copy this link:
                  </p>

                  <p style="font-size:12px;word-break:break-all;">
                    ${verificationUrl}
                  </p>
                </div>

                <div style="text-align:center;padding:15px;font-size:12px;color:#999;background:#fafafa;">
                  © ${new Date().getFullYear()} FoodHub
                </div>

              </div>
            </div>
          `,
                });
                console.log("Verification email sent to:", user.email);
            }
            catch (error) {
                console.error("Email error:", error);
                throw error;
            }
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});
//# sourceMappingURL=auth.js.map