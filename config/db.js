const mongoose = require("mongoose");
const logger = require("../utils/logger");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("🔥 MongoDB Connected", { service: "Database" });
  } catch (error) {
    logger.error("❌ MongoDB Connection Error", { error: error.message, stack: error.stack });
    process.exit(1);
  }
};

module.exports = connectDB;
