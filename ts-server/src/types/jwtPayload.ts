export interface IJwtPayloadAuth {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  role: string;
  emailVerified: boolean;
}

export interface IJwtPayloadChangePassword {
  id: string;
  allowPasswordReset: boolean;
  iat: number; // UNIX-Timestamp in seconds
  exp: number; // UNIX-Timestamp in seconds
}

export interface IJwtPayloadVerifyEmail {
  id: string;
  email: string;
  iat: number; // UNIX-Timestamp in seconds
  exp: number; // UNIX-Timestamp in seconds
}
