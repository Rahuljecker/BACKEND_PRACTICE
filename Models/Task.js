import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  IsCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: false,
    ref:"User",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});
export const Task = mongoose.model("Task", taskSchema);
