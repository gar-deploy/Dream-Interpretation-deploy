import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema(
  {
    usersText: {
      type: String,
      required: true,
    },
    generatedText: {
      type: String,
    },
  },
  { timestamps: true }
);

const dreamModel = mongoose.model("Dream", dreamSchema);

export default dreamModel;
