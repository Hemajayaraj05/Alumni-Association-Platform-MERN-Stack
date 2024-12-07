import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import UserProfile from './UserProfile';
import Feed from './Feed';
import Chat from './Chat';
import EditProfile from './EditProfile';
import AddPost from './AddPost';

import './MainPage.css';

const MainPage = () => {
  // State to hold the logged-in user's info
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userRole: '',
    profileImage: '',
  });

  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('role');
    const storedProfileImage = localStorage.getItem('profileImage') || 'default-profile.jpg'; // Fallback image

    setUserInfo({
      userName: storedUserName || 'Guest',
      userRole: storedUserRole || 'No Role Available',
      profileImage: storedProfileImage,
    });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Function to handle successful profile update
  const handleProfileUpdate = (updatedUserInfo) => {
    // Update the state with the new user info
    setUserInfo(updatedUserInfo);

    // Store the updated info in localStorage to persist it
    localStorage.setItem('userName', updatedUserInfo.userName);
    localStorage.setItem('role', updatedUserInfo.userRole);
    localStorage.setItem('profileImage', updatedUserInfo.profileImage);

    // Optionally navigate to the main page or profile page
    navigate('/main'); // Navigate to the home page after profile update
  };

  return (
    <div className="mainPage">
      <header className="header">
        <div className="logo">Reconnectify</div>
        <input type="text" className="searchBar" placeholder="Search..." />
        <div className="userInfo">
          {/* Display the user's name if available */}
          {userInfo.userName ? (
            <p>Welcome, {userInfo.userName}!</p>
          ) : (
            <p>Please log in</p>
          )}
        </div>
      </header>

      <div className="content">
        {/* Left Sidebar - User Profile */}
        <div className="profile">
          {/* Pass the user info to the UserProfile component */}
          <UserProfile
            userName={userInfo.userName}
            userRole={userInfo.userRole}
            profileImage={userInfo.profileImage}
          />
          <Link to="/profile/edit" className="editProfile">Edit Profile</Link>
          <Link to="/profile/add-post" className="addPost">Add a Post</Link>
        </div>

        {/* Center - Feed Section */}
        <div className="feed">
         
          <Routes>
  <Route path="/" element={<Feed />} />
  <Route path="/profile/edit" element={<EditProfile onProfileUpdate={handleProfileUpdate} />} />
  <Route path="/profile/add-post" element={<AddPost />} />
</Routes>
          
        </div>

        {/* Right Sidebar - Chat Section */}
        <div className="chat">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
