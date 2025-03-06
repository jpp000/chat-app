import { connect } from "mongoose";
import { env } from "./config.js";

export class MongoDatabase {
  async connect() {
    try {
      await connect(env.MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log("Error connecting to MongoDB");
      process.exit(1);
    }
  }
}
