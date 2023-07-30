import { isObjectId } from "../helpers/database.helper.js";
import { AlreadyExistException } from "../helpers/exception/alreadyExistException.js";
import { NotFoundException } from "../helpers/exception/notFoundException.js";
import { UnprocessableEntityException } from "../helpers/exception/unprocessableEntityException.js";
import { bookRepository } from "../repository/index.js";

const createBook = async (bookData) => {
  const duplicateBook = await bookRepository.findBookByTitle(bookData.title);
  if (duplicateBook)
    throw new AlreadyExistException(`Book ${bookData.title} already exist`);
  return await bookRepository.createBook(bookData);
};

const updateBook = async (bookId, bookData) => {
  if (!bookId?.trim() || !isObjectId(bookId))
    throw new UnprocessableEntityException(`Invalid ${bookId}`);
  const duplicateBook = await bookRepository.findBookByTitle(bookData.title);
  if (duplicateBook && duplicateBook.id !== bookId)
    throw new AlreadyExistException(`Book ${bookData.title} already exist`);
  return await bookRepository.updateBook(bookId, bookData);
};

const deleteBook = async (bookId) => {
  if (!bookId?.trim() || !isObjectId(bookId))
    throw new UnprocessableEntityException(`Invalid ${bookId}`);
  const book = await bookRepository.findBookById(bookId);
  if (!book) throw new NotFoundException(`Book ${bookId} not found`);
  return await bookRepository.deleteBook(bookId);
};

const findBookById = async (bookId) => {
  if (!bookId?.trim() || !isObjectId(bookId))
    throw new UnprocessableEntityException(`Invalid ${bookId}`);
  const book = await bookRepository.findBookById(bookId);
  if (!book) throw new NotFoundException(`Book ${bookId} not found`);
  return book;
};

const getAllBooks = async (filters) => {
  return await bookRepository.getAllBooks(filters);
};

export default {
  createBook,
  updateBook,
  deleteBook,
  deleteBook,
  findBookById,
  getAllBooks,
};
