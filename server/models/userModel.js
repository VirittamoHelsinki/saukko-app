// Import required modules and libraries
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["customer", "admin", "supervisor"],
    }
});

// Transform the returned object to remove the passwordHash and __v properties
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
