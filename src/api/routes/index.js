import express from "express";
import bookRoutes from "./book.js";

const routes = express.Router();

/* Configure books routes */
routes.use("/books", bookRoutes);

export default routes;
