import Joi from "joi";

export const EnvironmentSchemaConfig = Joi.object({
  PORT: Joi.string().default(3000).optional(),
  MONGODB_URI: Joi.string().default("mongodb://localhost:27017/book-library").optional(),
}).unknown();
