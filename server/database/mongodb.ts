import mongoose from "mongoose";

let isConnected = false;

export default async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(useRuntimeConfig().mongodbUri);

    isConnected = true;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);

    throw error;
  }
}
