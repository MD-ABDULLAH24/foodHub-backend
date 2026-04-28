import { NextFunction, Request, Response } from "express";
import { RoleType } from "../lib/enum";
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
declare const auth: (...roles: RoleType[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map