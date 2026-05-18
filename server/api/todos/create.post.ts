import connectDB from "../../database/mongodb";
import Todo from "../../models/Todo";
import { verifyToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);

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

  const todo = await Todo.create({
    title: body.title,

    user: decoded.id,
  });

  return todo;
});
