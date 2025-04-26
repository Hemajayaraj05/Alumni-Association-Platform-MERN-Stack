import React, { useState } from 'react';
import axios from 'axios';
import './User/styles/addpost.css';

const AddPost = () => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!postText.trim()) {
      console.error('Content is required');
      return;
    }

    const formData = new FormData();
    formData.append('content', postText); // Append the content
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const token = localStorage.getItem('token'); // Retrieve token from storage
      setIsSubmitting(true); // Set submitting state to true to disable button during submission

      const response = await axios.post(
        'http://localhost:5000/api/posts/create',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token for authentication
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        }
      );

      console.log('Post created successfully:', response.data);
      setPostText(''); // Clear the text input after submission
      setImage(null); // Clear the image input after submission
    } catch (err) {
      console.error('Error creating post:', err.response?.data || err.message);
    } finally {
      setIsSubmitting(false); // Reset submitting state
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
