import mongoose from "mongoose";

export default async () => {
  try {
    const connection = await mongoose.connect(process.env.DBURL);
    if (connection) {
      console.log(`Successfully connected to the database`);
    }
  } catch (e) {
    console.log(`Error occured while connecting to database ${e}`);
  }
};
