import React from 'react';

// UserProfile component that dynamically loads user info from props
const UserProfile = ({ userName, userRole, profileImage }) => {
  return (
    <div className="profileHeader">
      {/* Dynamically set the profile image */}
      <img src={profileImage} alt="Profile" className="profileImage" />
      <div className="userDetails">
        {/* Display user name and role */}
        <h3>{userName || 'No Name Available'}</h3>
        <p>{userRole || 'No Role Available'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
