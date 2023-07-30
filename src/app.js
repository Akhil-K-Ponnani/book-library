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

let envPath;
if (process.env.NODE_ENV === "dev") envPath = ".env.development";
else if (process.env.NODE_ENV === "test") envPath = ".env.test";
else envPath = ".env";
dotenv.config({ path: envPath });

/* Create express instance */
const app = express();

/* Establish connection to mongodb */
mongoose
  .connect(process.env.MONGODB_URI, MongooseConfig)
  .then(() => logger.info(`Connected to MongoDB...`))
  .catch((err) => logger.error("Could not connect to MongoDB...", err));

/* Validate environmental variables */
const { value: envVars, error } = EnvironmentSchemaConfig.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Sanitization to prevent attacks from XSS */
app.use(helmet());

app.disable("x-powered-by");

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: true,
    },
  })
);

/* Congiure base routes */
app.use("/api/v1", routes);

/* Catch invalid routes */
app.use((req, res) => {
  res
    .status(404)
    .json({ statusCode: 404, title: `Cannot ${req.method} ${req.url}` });
});

export const Environment = envVars;

export default app;
