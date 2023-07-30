import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { MongooseConfig } from "./config/mongoose.config.js";
import { EnvironmentSchemaConfig } from "./config/environment.schema.config.js";
import routes from "./api/routes/index.js";
import logger from "./api/helpers/logger/logger.js";
import helmet from "helmet";
import session from "express-session";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, MongooseConfig)
  .then(() => logger.info(`Connected to MongoDB...`))
  .catch((err) => logger.error("Could not connect to MongoDB...", err));

const { value: envVars, error } = EnvironmentSchemaConfig.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.disable("x-powered-by");

app.use(
  session({
    secret: "secret",
    cookie: {
      httpOnly: true,
      secure: true,
    },
  })
);

app.use("/api/v1", routes);

app.use((req, res) => {
  res
    .status(404)
    .json({ statusCode: 404, title: `Cannot ${req.method} to ${req.url}` });
});

export const Environment = envVars;

export default app;
