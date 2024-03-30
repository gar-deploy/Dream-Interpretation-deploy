import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);

    console.log("MongoDB is Connected");
  } catch (error) {
    console.error("Error to connect MongoDB", error.message);
  }
};

export default dbConnection;
