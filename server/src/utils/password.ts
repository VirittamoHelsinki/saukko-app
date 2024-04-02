export type ValidationOptions = {
  minLength?: number;
  requireNumbers?: boolean;
  requireLowerCase?: boolean;
  requireUpperCase?: boolean;
  requireSpecialChars?: boolean;
};

export class PasswordValidator {
  validate(password: string, options: ValidationOptions): string[] {
    const errors: string[] = [];
    console.log("password", password)
    // Tarkista minimipituus
    if (options.minLength !== undefined && (password.length < options.minLength)) {
      errors.push(`Salasanan on oltava vähintään ${options.minLength} merkkiä pitkä.`);
    }

    // Tarkista numerot
    if (options.requireNumbers && !/\d/.test(password)) {
      errors.push("Salasanan on sisällettävä vähintään yksi numero.");
    }

    // Tarkista pienet kirjaimet
    if (options.requireLowerCase && !/[a-z]/.test(password)) {
      errors.push("Salasanan on sisällettävä vähintään yksi pieni kirjain.");
    }

    // Tarkista isot kirjaimet
    if (options.requireUpperCase && !/[A-Z]/.test(password)) {
      errors.push("Salasanan on sisällettävä vähintään yksi iso kirjain.");
    }

    // Tarkista erikoismerkit
    if (options.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Salasanan on sisällettävä vähintään yksi erikoismerkki.");
    }

    return errors;
  }
}
