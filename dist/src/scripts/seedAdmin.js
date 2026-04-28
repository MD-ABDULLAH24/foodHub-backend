import fetch from "node-fetch";
import { prisma } from "../lib/prisma";
async function seedAdmin() {
    try {
        const adminData = {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: process.env.ADMIN_ROLE,
        };
        // Check if admin already exists in database
        const existingUser = await prisma.user.findFirst({
            where: { email: adminData.email },
        });
        if (existingUser) {
            console.log("Admin already exists ✅");
            return;
        }
        // Call Better Auth sign-up API
        const response = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(adminData),
        });
        const data = await response.json();
        if (!response.ok) {
            console.error("Signup failed:", response.status, data);
            return;
        }
        await prisma.user.update({
            where: { email: adminData.email },
            data: { emailVerified: true },
        });
    }
    catch (error) {
        console.error("Seed admin failed:", error);
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map