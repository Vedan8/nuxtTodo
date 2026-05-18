import connectDB from "../database/mongodb";

export default defineNitroPlugin(async (nitroApp) => {
  try {
    await connectDB();
    console.log("Database initialized during server startup.");
  } catch (error) {
    console.error("Failed to initialize database during startup:", error);
  }
});
