//TODO Libraries
import { Schema } from "mongoose";
//TODO Pages
import { DEFAULT_VALIDATION, URL } from "../mongooseValidators.js";

export const Image = new Schema({
  url: { ...URL, default: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg" },
  alt: { ...DEFAULT_VALIDATION, minLength: 0, required: false,default: "thats an image" },
});
