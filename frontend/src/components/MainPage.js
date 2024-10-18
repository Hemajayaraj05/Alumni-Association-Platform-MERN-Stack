import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MainPage.css';

function MainPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserData();
    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Handle liking a post
  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:5000/posts/${postId}/like`);
      fetchPosts(); // Refresh posts after liking
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="main-page-container">
      <div className="profile-section">
        {user && (
          <>
            <img className="profile-image" src="/path/to/profile-pic.jpg" alt="Profile" />
            <h3>{user.name}</h3>
            <p><strong>Work Experience:</strong> {user.profile?.workExperience || 'N/A'}</p>
            <p><strong>Company Name:</strong> {user.profile?.companyName || 'N/A'}</p>
            <p><strong>Mentor:</strong> {user.profile?.isMentor ? 'Yes' : 'No'}</p>
            <p><strong>Skills:</strong> {user.profile?.skills || 'N/A'}</p>
            <Link to="/edit-profile" className="edit-profile-button">Edit Profile</Link>
          </>
        )}
      </div>

      <div className="feed-section">
        <FeedForm onNewPost={fetchPosts} /> {/* Pass fetchPosts as a prop */}
        <Feed posts={posts} onNewPost={fetchPosts} onLike={handleLike} />
      </div>
    </div>
  );
}

const FeedForm = ({ onNewPost }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setContent('');
      setFile(null);
      onNewPost(); // Call the passed function to refresh the posts after submission
    } catch (error) {
      console.error('Error posting feed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feed-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Post</button>
    </form>
  );
};

const Feed = ({ posts, onNewPost, onLike }) => (
  <div className="feed">
    {posts.length > 0 ? (
      posts.map((post) => (
        <div key={post._id} className="post">
          <p>{post.content}</p>
          {post.file && <img src={post.file} alt="Uploaded" />} {/* Display uploaded image */}
          <div className="post-actions">
            <button onClick={() => onLike(post._id)}>Like ({post.likes || 0})</button>
          </div>
        </div>
      ))
    ) : (
      <p>No posts yet. Be the first to post something!</p>
    )}
  </div>
);

export default MainPage;
