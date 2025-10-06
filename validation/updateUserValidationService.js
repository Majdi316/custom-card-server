//TODO Import Function
import UpdateRegisterSchema from "./updateUserValidationScheme.js";

//TODO Functions
const validateUpdateUser = (user) => {
  return UpdateRegisterSchema.validate(user);
};

//TODO Export 
export { validateUpdateUser };
