// routes/postRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new post
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { content, imageUrl } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: 'Content is required' });
    }
const post = new Post({
  userId: req.body.userId,
  content: req.body.content,
  imageUrl: `/uploads/${req.file.filename}`, // Assuming file upload logic
});
await post.save();

    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});


// Fetch all posts
router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'name profileImage') // Fields from RegisteredUser
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

module.exports = router;
