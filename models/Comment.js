import mongoose from "mongoose";

const CommentShema = new mongoose.Schema({
  text: {
    type: String,
    required: "text is required!"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", CommentShema);
export default model;