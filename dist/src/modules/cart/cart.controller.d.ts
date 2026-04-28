import { Request, Response } from "express";
declare const addToCart: (req: Request, res: Response) => Promise<void>;
declare const getCart: (req: Request, res: Response) => Promise<void>;
declare const updateQuantity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const removeItem: (req: Request, res: Response) => Promise<void>;
declare const clearCart: (req: Request, res: Response) => Promise<void>;
export { addToCart, getCart, updateQuantity, removeItem, clearCart, };
//# sourceMappingURL=cart.controller.d.ts.map