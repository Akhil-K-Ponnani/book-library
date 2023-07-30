import { Types } from "mongoose";

export const getPaginationParams = (page = 1, limit = 30) => ({
  limit,
  skip: (page - 1) * limit,
});

export const isObjectId = (id) =>
  Types.ObjectId.isValid(id) && String(new Types.ObjectId(id)) === id;
