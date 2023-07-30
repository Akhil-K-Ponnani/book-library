import { Types } from "mongoose";
import { getPaginationParams } from "../helpers/database.helper.js";
import { NotFoundException } from "../helpers/exception/notFoundException.js";
import logger from "../helpers/logger/logger.js";
import { book } from "../models/index.js";

const createBook = async (bookData) => {
  const start = process.hrtime();

  const result = await book.create(bookData);

  const retModel = toBookModel(result);

  const stop = process.hrtime(start);

  logger.info(`Create Book took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

  return retModel;
};

const updateBook = async (bookId, bookData) => {
  const start = process.hrtime();

  const result = await book.findByIdAndUpdate(bookId, bookData, { new: true });

  if (!result) throw new NotFoundException(`Book ${bookId} not found`);

  const retModel = toBookModel(result);

  const stop = process.hrtime(start);

  logger.info(`Update Book took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

  return retModel;
};

const deleteBook = async (bookId) => {
  const start = process.hrtime();

  await book.deleteOne({ _id: new Types.ObjectId(bookId) });

  const stop = process.hrtime(start);

  logger.info(`Delete Book took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);
};

const findBookById = async (bookId) => {
  const start = process.hrtime();

  const result = await book.findById(bookId);

  const retModel = result ? toBookModel(result) : undefined;

  const stop = process.hrtime(start);

  logger.info(`Find Book by Id took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

  return retModel;
};

const findBookByTitle = async (bookTitle) => {
  const start = process.hrtime();

  const result = await book.findOne({ title: bookTitle });

  const retModel = result ? toBookModel(result) : undefined;

  const stop = process.hrtime(start);

  logger.info(`Find Book by Title took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

  return retModel;
};

const getAllBooks = async (customFilter) => {
  const start = process.hrtime();

  const { limit, skip } = getPaginationParams(
    customFilter?.page,
    customFilter?.limit
  );

  let filters = {};
  if (customFilter?.title) filters.title = customFilter.title;
  if (customFilter?.author) filters.author = customFilter.author;
  if (customFilter?.year) filters.year = customFilter.year;
  if (customFilter?.language) filters.language = customFilter.language;
  if (customFilter?.search)
    filters = {
      ...filters,
      $or: [
        { title: { $regex: customFilter.search, $options: "i" } },
        { author: { $regex: customFilter.search, $options: "i" } },
        { language: { $regex: customFilter.search, $options: "i" } },
      ],
    };

  const result = await book.find(filters, undefined, {
    limit,
    skip,
    sort: { createdAt: -1 },
  });
  const total = await book.count(filters);

  const retModel = result.map((book) => toBookModel(book));

  const stop = process.hrtime(start);

  logger.info(`Get all Books took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

  return { data: retModel, total };
};

const toBookModel = (book) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  pages: book.pages,
  year: book.year,
  language: book.language,
  link: book?.link,
  imageLink: book?.imageLink,
  createdAt: book.createdAt.getTime(),
  updatedAt: book.updatedAt.getTime(),
});

export default {
  createBook,
  updateBook,
  deleteBook,
  findBookById,
  findBookByTitle,
  getAllBooks,
};
