import React, { useState } from 'react';
import axios from 'axios';
import './User/styles/addpost.css';

const AddPost = () => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!postText.trim()) {
      console.error("Content is required"); // Log error if content is empty
      return;
    }
  
    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      const postData = {
        content: postText, // Use user input for content
        imageUrl: image ? image.name : null, // Optional field if an image is uploaded
      };
  
      const response = await axios.post(
        'http://localhost:5000/api/posts/create',
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }
      );
  
      console.log("Post created successfully:", response.data);
      setPostText(''); // Clear the textarea after successful submission
      setImage(null); // Clear the image input after successful submission
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
    }
  };
  
  return (
    <div className="addPostForm">
      <textarea
        placeholder="What’s on your mind?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handlePost} disabled={isSubmitting}>
        {isSubmitting ? 'Posting...' : 'Post'}
      </button>
    </div>
  );
};

export default AddPost;
