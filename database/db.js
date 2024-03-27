import mongoose from "mongoose";

// const URI = process.env.MONGO_URI;
const URI = process.env.MONGO_DB_PROD;
// const DB = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(`${URI}`);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
