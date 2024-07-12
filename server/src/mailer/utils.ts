import { UserRoleEnum, UserRole } from "./types";

export const getUserRole = (role: string): UserRole => {
  if (Object.values(UserRoleEnum).includes(role as UserRoleEnum)) {
    return role as UserRoleEnum;
  }
  return null;
}





