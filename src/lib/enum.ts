export const Role = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
} as const;

export type RoleType = typeof Role[keyof typeof Role];