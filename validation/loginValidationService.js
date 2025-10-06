//TODO Import Function
import loginSchema from "./loginValidationSchema.js";

//TODO Functions
const validateLogin = (user) => {
  return loginSchema.validate(user);
};

//TODO Export
export { validateLogin };
