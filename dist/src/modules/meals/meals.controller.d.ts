import { NextFunction, Request, Response } from "express";
declare const _default: {
    createMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllMeals: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMealById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getMyMeals: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteMeal: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
export default _default;
//# sourceMappingURL=meals.controller.d.ts.map