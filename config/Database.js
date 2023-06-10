import mongoose from "mongoose";

export const connectDb = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "TODOBACKEND" })
    .then(() => console.log("Database Connected with loalhost"))
    .catch((err) => console.log(err));
};
