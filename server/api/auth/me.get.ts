import connectDB from "../../database/mongodb";
import User from "../../models/User";
import { verifyToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  await connectDB();

  const token = getCookie(event, "token");

  // No token → return null instead of throwing
  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token) as {
      id: string;
    };

    const user = await User.findById(decoded.id).select("-password");

    return user;
  } catch {
    return null;
  }
});
