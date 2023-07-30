import { Schema, model } from "mongoose";
import { Language } from "../helpers/constants/language.js";

const Book = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      enum: Object.values(Language),
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    imageLink: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default model("Book", Book);
