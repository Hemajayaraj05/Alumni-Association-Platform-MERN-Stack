import React from 'react';
import Navbar from './Navbar';
import "../styles/Home.css"
function Home() {
  return (
    <div className='homeContainer'>
      <Navbar />
      <div className="home-content">
        <h1>Welcome to the Alumni Association</h1>
        <p>Stay connected with your fellow alumni, share experiences, and grow your network.</p>
        <button className="get-started">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
