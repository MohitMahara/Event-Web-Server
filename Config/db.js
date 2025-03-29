import mongoose, { connect }  from "mongoose";

export const connectDB = async (next) =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to database successfully`);
    } catch (error) {
        console.log(`Error connnecting to database : ${error.message}`);
    }
}