import mongoose from "mongoose";

const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Database Connected ...");
  } catch (error) {
    console.log(`Database not connected !!!`);
  }
};

export default connectDb;
