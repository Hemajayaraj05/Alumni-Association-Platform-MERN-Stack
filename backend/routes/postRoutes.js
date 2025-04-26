const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage });

// Create a new post with image upload
router.post('/create', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Create post with image URL
    const post = new Post({
      userId: req.user.id, // Get user id from the token (authMiddleware sets req.user)
      content: req.body.content,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Image URL will be set if file is uploaded
    });

    await post.save();

    res.status(200).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// Fetch all posts
router.get('/feed', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'name profileImage') 
      .sort({ createdAt: -1 }); 

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

module.exports = router;
