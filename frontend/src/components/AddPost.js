// components/AddPost.js
import React, { useState } from 'react';
import axios from 'axios';
import './User/styles/addpost.css'

const AddPost = () => {
  const [postText, setPostText] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('content', postText);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        alert('Post created successfully');
        setPostText('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } finally {
      setIsSubmitting(false);
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
