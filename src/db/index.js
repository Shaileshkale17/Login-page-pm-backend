import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connection = async () => {
  try {
    // Construct the connection string
    const connectionString = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;
    // Connect to the database
    const connectionInstance = await mongoose.connect(connectionString);

    console.log(
      `\n MongoDB connection established! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error: " + error);
  }
};
