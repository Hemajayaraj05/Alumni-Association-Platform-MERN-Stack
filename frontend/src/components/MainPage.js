import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MainPage.css';
import { FaThumbsUp } from 'react-icons/fa'; // Import thumbs up icon

function MainPage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [showAddPostForm, setShowAddPostForm] = useState(false); // State to toggle the Add Post form

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user');
        setUser(response.data);
        if (response.data.profileImage) {
          setProfileImage(response.data.profileImage);
        }
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

  // Handle profile image change
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const response = await axios.post('http://localhost:5000/user/upload-profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfileImage(response.data.profileImage);
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  return (
    <div className="main-page-container">
      {/* Navbar with the profile image */}
      <div className="navbar">
        <Link to="/"><img className="navbar-profile-image" src={profileImage || '/default-profile.png'} alt="Profile" /></Link>
        <input type="file" onChange={handleProfileImageChange} className="upload-profile-image" />
      </div>

      <div className="profile-section">
        {user && (
          <>
            <img className="profile-image" src={profileImage || '/default-profile.png'} alt="Profile" />
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
        {/* "+Add Post" Button */}
        <button className="add-post-button" onClick={() => setShowAddPostForm(!showAddPostForm)}>
          + Add Post
        </button>

        {/* Show the form only when the Add Post button is clicked */}
        {showAddPostForm && <FeedForm onNewPost={fetchPosts} />}
        
        <Feed posts={posts} onLike={handleLike} />
      </div>
    </div>
  );
}

// FeedForm Component
const FeedForm = ({ onNewPost }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

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
      setFilePreview(null);
      onNewPost(); // Refresh the posts
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
      <input type="file" onChange={handleFileChange} />
      {filePreview && (
        <img
          src={filePreview}
          alt="Preview"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            marginTop: '10px',
          }}
        />
      )}
      <button type="submit">Post</button>
    </form>
  );
};

// Feed Component
const Feed = ({ posts, onLike }) => (
  <div className="feed">
    {posts.length > 0 ? (
      posts.map((post) => (
        <div key={post._id} className="post">
          <p>{post.content}</p>
          {post.imageUrl && (
            <img src={`http://localhost:5000${post.imageUrl}`} alt="Post" />
          )}
          <div className="post-actions">
            <button onClick={() => onLike(post._id)}>
              <FaThumbsUp /> {post.likes} Like{post.likes !== 1 && 's'}
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="no-posts">
        <p>No posts available.</p>
      </div>
    )}
  </div>
);

export default MainPage;
