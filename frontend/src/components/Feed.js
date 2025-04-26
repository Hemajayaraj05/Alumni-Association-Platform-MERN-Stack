import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [count,setCount] = useState(1);
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
        <div key={post._id} className="postCard">
          <div className="postHeader">
           
            <div className="userInfo">
              <h3>{post.userId.name}</h3>
              <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="postContent ">{post.content}</p>
          {post.imageUrl && (
            <img
              src={`http://localhost:5000${post.imageUrl}`} // Full URL to the image
              alt="Post"
              className="postImage"
            />
          )}
          <div className="postFooter">
            <button className="likeBtn" onClick={()=>{setCount(count+1)}}> {count} Like</button>
            <button className="commentBtn">Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
