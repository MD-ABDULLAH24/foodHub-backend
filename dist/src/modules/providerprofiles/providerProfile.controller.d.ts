import { NextFunction, Request, Response } from "express";
export declare const providerProfileController: {
    createProviderProfile: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllProvider: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getProviderById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMyProvider: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=providerProfile.controller.d.ts.map