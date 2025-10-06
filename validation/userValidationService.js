//TODO Import Function
import registerSchema from "./userValidationSchema.js";

//TODO Functions
const validateUser = (user) => {
  return registerSchema.validate(user);
};

//TODO Export
export { validateUser };
