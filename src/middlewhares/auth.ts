import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { Role, RoleType } from "../lib/enum"; 

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: RoleType;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: RoleType[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get session
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
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

      const userRole = session.user.role as RoleType;

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
    } catch (error) {
      next(error);
    }
  };
};

export default auth;