import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  image: {
    type: String,
    required: true,
    trim:true
  },
  sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true
  },
  days: [
    {
      day: { type: Number, min: 1, required: true },
      title: { type: String, required: true },
      videoUrl: { type: String, required: true },
      description: { type: String, required: true },
      bulletPoints: [{ type: String }],
    },
  ],
});

const Course = mongoose.model('course', courseSchema);
