import { Request, Response } from "express";
import providerProfileService from "./providerProfile.service";

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const authUserId = req.user?.id;

    if (!authUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await providerProfileService.createProviderProfile(
      authUserId,
      req.body,
    );

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Provider Profile creation failed",
    });
  }
};

const getAllProvider = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const result = await providerProfileService.getAllProvider({
      search: searchString,
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Provider Profile creation failed",
    });
  }
};

const getProviderById = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    if (!providerId) {
      throw new Error("Provider Id is required");
    }
    const result = await providerProfileService.getProviderById(
      providerId as string,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "",
    });
  }
};

const getMyProvider = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized");
    }
    const result = await providerProfileService.getMyProvider(
      user?.id as string,
    );
    res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch provider profile",
    });
  }
};

export const providerProfileController = {
  createProviderProfile,
  getAllProvider,
  getProviderById,
  getMyProvider,
};
