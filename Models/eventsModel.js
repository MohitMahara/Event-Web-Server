import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
{
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    date: {
      type: Date,
      required: true,
      default : Date.now
    },

    time: {
      type: String,
      required: true,
      trim: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    organizer: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required : true,
      trim: true,
    },

    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
        required : true
    },

    registeredUsers: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "users"
        }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("events", eventsSchema);