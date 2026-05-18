import connectDB from "../../database/mongodb";
import User from "../../models/User";
import { hashPassword } from "../../utils/hash";
import { registerSchema } from "../../../shared/auth.schema";

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation error",
    });
  }

  const parsedData = parsed.data;

  const existingUser = await User.findOne({
    email: parsedData.email,
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  const password = await hashPassword(parsedData.password);

  await User.create({
    username: parsedData.username,
    email: parsedData.email,
    password,
  });

  return {
    message: "User created",
  };
});
