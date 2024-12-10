// models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RegisteredUser', // Match the model name used in `registerModel`
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true } // Automatically handle createdAt and updatedAt
);

module.exports = mongoose.model('Post', postSchema);
