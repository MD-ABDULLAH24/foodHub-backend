import { ProviderProfiles } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createProviderProfile = async (
  data: Omit<
    ProviderProfiles,
    "id" | "createdAt" | "updatedAt" | "authUserId"
  >
): Promise<ProviderProfiles> => {
  const result = await prisma.providerProfiles.create({
    data,
  });

  return result;
};

export default {
  createProviderProfile,
};
