import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema(
  {
    dream: {
      type: String,
      required: true,
    },
    generatedDream: {
      type: String,
    },
  },
  { timestamps: true }
);

const dreamModel = mongoose.model("Dream", dreamSchema);

export default dreamModel;
