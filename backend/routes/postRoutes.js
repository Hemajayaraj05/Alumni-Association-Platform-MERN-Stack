// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new post
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { content, imageUrl } = req.body;
    const newPost = new Post({
      userId: req.user._id, // Get the user from the authMiddleware
      content,
      imageUrl,
    });

    await newPost.save();
    res.status(200).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// routes/postRoutes.js
router.get('/feed', async (req, res) => {
    try {
      const posts = await Post.find().populate('userId', 'userName profileImage').sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
  });
  

module.exports = router;
