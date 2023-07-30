import express from "express";
import { bookController } from "../controllers/index.js";

const bookRoutes = express.Router();

bookRoutes.post("/", bookController.createBook);
bookRoutes.put("/:id", bookController.updateBook);
bookRoutes.delete("/:id", bookController.deleteBook);
bookRoutes.get("/", bookController.getAllBooks);
bookRoutes.get("/:id", bookController.findBookById);

export default bookRoutes;
