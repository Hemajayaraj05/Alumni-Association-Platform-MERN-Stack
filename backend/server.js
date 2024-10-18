const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/alumniDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schemas and Models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  yearOfPassing: String,
  currentlyWorking: String,
  yearOfJoining: String,
  departmentCode: String,
  rollNumber: String,
  registrationNumber: String,
  password: String,
  profile: {
    workExperience: String,
    companyName: String,
    isMentor: Boolean,
    skills: String,
  },
});

const PostSchema = new mongoose.Schema({
  content: String,
  postedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

// Routes
app.post('/register', async (req, res) => {
  const {
    name, email, phone, yearOfPassing,
    currentlyWorking, yearOfJoining, departmentCode,
    rollNumber, registrationNumber, password
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    phone,
    yearOfPassing,
    currentlyWorking,
    yearOfJoining,
    departmentCode,
    rollNumber,
    registrationNumber,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  res.json({ message: 'Logged in successfully', user });
});

app.get('/user', async (req, res) => {
  const user = await User.findOne(); // Fetch user data
  res.json(user);
});

app.get('/profile', async (req, res) => {
  const user = await User.findOne(); // Fetch user profile data
  res.json(user.profile);
});

app.put('/profile', async (req, res) => {
  const { workExperience, companyName, isMentor, skills } = req.body;
  const user = await User.findOne();

  user.profile = { workExperience, companyName, isMentor, skills };
  await user.save();

  res.json({ message: 'Profile updated successfully' });
});
// Increment likes for a post
app.post('/posts/:id/like', async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }); // Increment likes
    res.status(200).send({ message: 'Post liked successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to like post.' });
  }
});

app.post('/posts', async (req, res) => {
  const { content } = req.body;
  const user = await User.findOne(); // Assume user is logged in and fetched from DB

  const newPost = new Post({ content, user: user._id });
  await newPost.save();

  res.status(201).json({ message: 'Post created successfully' });
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('user');
  res.json(posts);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
