import connectDB from "../../database/mongodb";
import Todo from "../../models/Todo";
import { verifyToken } from "../../utils/jwt";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
  await connectDB();

  const token = getCookie(event, "token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const decoded = verifyToken(token) as {
    id: string;
  };

  const todos = await Todo.find({
    user: new mongoose.Types.ObjectId(decoded.id),
  }).sort({
    createdAt: -1,
  });

  return todos;
});
