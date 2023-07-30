import express from "express";
import bookRoutes from "./book.js";

const routes = express.Router();

routes.use("/books", bookRoutes);

export default routes;
