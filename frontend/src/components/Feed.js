// components/Feed.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/feed', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to load posts');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feedContainer">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <div className="postHeader">
            <img src={post.userId.profileImage} alt={post.userId.userName} />
            <h3>{post.userId.userName}</h3>
          </div>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
          <div className="postFooter">
            <button>Like</button>
            <button>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
