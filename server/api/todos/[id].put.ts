import connectDB from "../../database/mongodb";
import Todo from "../../models/Todo";

export default defineEventHandler(async (event) => {
  await connectDB();

  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid todo ID",
    });
  }

  const body = await readBody(event);

  const todo = await Todo.findByIdAndUpdate(
    id,

    {
      completed: body.completed,
    },

    {
      new: true,
    },
  );

  return todo;
});
