const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  // Validate name
  if (!firstName || !lastName) {
    throw new Error("First name or last name is missing or invalid");
  }

  // Validate email
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  // Validate strong password
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Please enter a stronger password. Password must be at least 8 characters long, include an uppercase letter, a number, and a symbol."
    );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditsFields = [
    "firstName", 
    "lastName",
    "gender",
    "age",
    "emailId",
    "about",
    "photoUrl",
    "skills"
];

 const IsEditAllowed = Object.keys(req.body).every(field=> allowedEditsFields.includes(field));
 return IsEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData
};
