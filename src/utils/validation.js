const validator = require("validator");

// const validateSignUpData = (req) => {
//   const { firstName, lastName, emailId, password } = req.body;

//   // Validate name
//   if (!firstName || !lastName) {
//     throw new Error("First name or last name is missing or invalid");
//   }

//   // Validate email
//   if (!validator.isEmail(emailId)) {
//     throw new Error("Email is not valid");
//   }

//   // Validate strong password
//   if (!validator.isStrongPassword(password)) {
//     throw new Error(
//       "Please enter a stronger password. Password must be at least 8 characters long, include an uppercase letter, a number, and a symbol."
//     );
//   }
// };

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, gender, photoUrl } = req.body;

  if (!firstName || firstName.length < 3) {
    throw new Error("First name must be at least 3 characters long");
  }

  if (lastName && lastName.length < 3) {
    throw new Error("Last name must be at least 3 characters long");
  }

  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Please enter a stronger password. Password must be at least 8 characters long, include an uppercase letter, a number, and a symbol."
    );
  }



  if (gender && !["Male", "Female", "Others"].includes(gender)) {
    throw new Error("Gender must be Male, Female, or Others");
  }



  if (photoUrl && !validator.isURL(photoUrl)) {
    throw new Error("Invalid photo URL");
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
