import Joi from "joi";
import { Language } from "../helpers/constants/language.js";

const BookValidatorSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  pages: Joi.number().integer().min(1).required(),
  year: Joi.number()
    .integer()
    .min(1500)
    .max(new Date().getFullYear())
    .required(),
  language: Joi.string()
    .valid(...Object.values(Language))
    .required(),
  link: Joi.string().uri().optional(),
  imageLink: Joi.string().uri().optional(),
});

const BookFilterValidatorSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  year: Joi.number()
    .integer()
    .min(1500)
    .max(new Date().getFullYear())
    .optional(),
  language: Joi.string()
    .valid(...Object.values(Language))
    .optional(),
  search: Joi.string().optional(),
});

const validateBook = (bookData) => {
  const { error } = BookValidatorSchema.validate(bookData);
  return { error: error?.details };
};

const validateBookFilter = (booFilter) => {
  const { error } = BookFilterValidatorSchema.validate(booFilter);
  return { error: error?.details };
};

export default { validateBook, validateBookFilter };
