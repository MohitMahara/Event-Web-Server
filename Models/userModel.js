import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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

    photoURL: {
      type: String,
    },

    createdEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
    ],

    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "events",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
