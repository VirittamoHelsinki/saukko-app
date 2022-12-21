// import validator package
const passwordValidator = require("password-validator");

// Create a schema
const schema = new passwordValidator();

// Add properties to it
export const passwordVal = schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(30) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
