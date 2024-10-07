import React from 'react';
import Navbar from './Navbar';
import "../styles/Home.css"
function Home() {
  return (
    <>
      <Navbar />
      <div className="home-content">
        <h1>Welcome to the Alumni Association</h1>
        <p>Stay connected with your fellow alumni, share experiences, and grow your network.</p>
        <button className="get-started">Get Started</button>
      </div>
    </>
  );
};

export default Home;
