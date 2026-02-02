import { Request, Response } from "express";
import providerProfileService from "./providerProfile.service";

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const result = await providerProfileService.createProviderProfile(req.body);
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({
      error: "Provider Profile creation failed",
      details: error
    })
  }
};

export const providerProfileController = {
  createProviderProfile,
};
