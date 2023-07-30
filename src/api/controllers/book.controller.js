import { HttpStatus } from "../helpers/constants/httpStatus.js";
import { bookService } from "../services/index.js";
import { bookValidator } from "../validators/index.js";

const createBook = async (req, res) => {
  try {
    const { error } = bookValidator.validateBook(req.body);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    } else {
      const data = await bookService.createBook(req.body);
      res.status(HttpStatus.CREATED).json({ success: true, data });
    }
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const { error } = bookValidator.validateBook(req.body);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    } else {
      const data = await bookService.updateBook(req.params.id, req.body);
      res.status(HttpStatus.OK).json({ success: true, data });
    }
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(HttpStatus.OK).json({ success: true });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

const findBookById = async (req, res) => {
  try {
    const data = await bookService.findBookById(req.params.id);
    res.status(HttpStatus.OK).json({ success: true, data });
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { error } = bookValidator.validateBookFilter(req.query);
    if (error) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(error);
    } else {
      const { data, total } = await bookService.getAllBooks(req.query);
      res.status(HttpStatus.OK).json({ success: true, data, total });
    }
  } catch (error) {
    res.status(error.statusCode).json(error);
  }
};

export default {
  createBook,
  updateBook,
  deleteBook,
  findBookById,
  getAllBooks,
};
