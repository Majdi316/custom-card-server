//TODO Libraries
import mongoose from "mongoose";
//TODO Pages
import {
  DEFAULT_VALIDATION,
  EMAIL,
  PHONE,
  URL,
} from "../helpers/mongooseValidators.js";
import { Address } from "../helpers/subModels/Address.js";
import { Image } from "../helpers/subModels/Image.js";

//TODO Variables
const cardSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  description: {
    ...DEFAULT_VALIDATION,
    maxLength: 1024,
  },
  phone: PHONE,
  email: { ...EMAIL, unique: false },
  web: URL,
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("cards", cardSchema);
export default Card;
