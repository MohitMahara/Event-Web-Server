import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim : true,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    googleId: {
      type: String,
    },

    authProvider: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    photoURL: {
      type: String,
    },


  },{ timestamps: true });


  export default mongoose.model("users", userSchema);