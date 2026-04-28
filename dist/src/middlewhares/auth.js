import { auth as betterAuth } from "../lib/auth";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            // get session
            const session = await betterAuth.api.getSession({
                headers: req.headers,
            });
            if (!session?.user) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized",
                });
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verification required. Please verify your email!",
                });
            }
            const userRole = session.user.role;
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: userRole,
                emailVerified: session.user.emailVerified,
            };
            // role check
            if (roles.length && !roles.includes(userRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden! You don't have permission to access this resource!",
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map