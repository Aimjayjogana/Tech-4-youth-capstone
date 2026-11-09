
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    videoUrl: {
      type: String,
      required: true
    },

    order: {
      type: Number,
      required: true,
      min: 1
    },

    duration: {
      type: String,
      default: "Self-paced"
    },

    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

lessonSchema.index({ course: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Lesson", lessonSchema);
                