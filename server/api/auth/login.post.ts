import connectDB from "../../database/mongodb";
import User from "../../models/User";
import { comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";
import { loginSchema } from "../../../shared/auth.schema";

export default defineEventHandler(async (event) => {
  await connectDB();

  const body = await readBody(event);

  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation error",
    });
  }

  const parsedData = parsed.data;

  const user = await User.findOne({
    email: parsedData.email,
  });

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  const isPasswordCorrect = await comparePassword(
    parsedData.password,
    user.password,
  );

  if (!isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: "Wrong password",
    });
  }

  const token = generateToken(user._id.toString());

  setCookie(event, "token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    message: "Login successful",
  };
});
