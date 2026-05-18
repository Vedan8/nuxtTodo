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

  await Todo.findByIdAndDelete(id);

  return {
    message: "Deleted",
  };
});
