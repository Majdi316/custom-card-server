//TODO Libraries
import mongoose from "mongoose";
//TODO Pages
import { EMAIL, PHONE } from "../helpers/mongooseValidators.js";
import { Address } from "../helpers/subModels/Address.js";
import { Image } from "../helpers/subModels/Image.js";
import { Name } from "../helpers/subModels/Name.js";

//TODO Variables
const userSchema = new mongoose.Schema({
  name: Name,
  phone: PHONE,
  email: EMAIL,
  password: {
    type: String,
    required: true,
    trim: true,
  },
  image: Image,
  address: Address,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);
export default User;
