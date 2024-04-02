export enum useCase {
  AUTH,
  CHANGE_PASSWORD,
  VERIFY_EMAIL,
  INFO,
}

export interface IJwtPayload {
  id: string, // User-ID
  useCase: useCase; // Reason for the token
  iat: number; // UNIX-Timestamp in seconds
  exp: number; // UNIX-Timestamp in seconds
  role?: string; // Role of the user
  verified?: boolean; // Did the email is verified
}
