import updateCardSchema from "./updateCardValidationShema.js";

export const validateUpdateCard = (card) => {
  return updateCardSchema.validate(card);
};
