import { ValidationOptions } from "./utils/password";

export const passwordValidationOptions: ValidationOptions = {
  minLength: 6,
  requireLowerCase: false,
  requireUpperCase: false,
  requireSpecialChars: false,
  requireNumbers: false,
}
