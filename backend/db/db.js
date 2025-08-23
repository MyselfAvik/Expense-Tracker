import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Host : ", response.connection.host);
  } catch (error) {
    console.log("MongoDB connection Error ", error);
  }
};
