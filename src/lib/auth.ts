import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
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
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"FoodHub" <foodHub@gmail.com>',
          to: user.email,
          subject: "Verify your FoodHub account",
          text: `Hi ${user.name} || "There"`, // Plain-text version of the message
          html: `
  <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f8fa; padding: 40px 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background-color: #ff6b35; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">FoodHub 🍔</h1>
        <p style="color: #ffece4; margin: 5px 0 0;">Fresh food, fast delivery</p>
      </div>

      <!-- Body -->
      <div style="padding: 30px; color: #333333;">
        <h2 style="margin-top: 0;">Verify your email address</h2>

        <p style="font-size: 15px; line-height: 1.6;">
          Hi <strong>${user.name || "there"}</strong>,
        </p>

        <p style="font-size: 15px; line-height: 1.6;">
          Thanks for joining <strong>FoodHub</strong>!  
          Please confirm your email address by clicking the button below.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="background-color: #ff6b35; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: bold; display: inline-block;">
            Verify Email
          </a>
        </div>

        <p style="font-size: 14px; color: #555;">
          This verification link will expire soon for security reasons.
        </p>

        <p style="font-size: 14px; color: #555;">
          If you didn’t create a FoodHub account, you can safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

        <p style="font-size: 13px; color: #999;">
          Or copy and paste this link into your browser:
        </p>

        <p style="font-size: 12px; word-break: break-all; color: #999;">
          ${verificationUrl}
        </p>
            <p class="link">
          ${url}
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </div>
  </div>
  `, // HTML version of the message
        });
        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
