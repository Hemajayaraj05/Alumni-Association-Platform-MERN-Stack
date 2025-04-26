import React from 'react';

// UserProfile component that dynamically loads user info from props
const UserProfile = ({ userName, userRole, profileImage }) => {
  // Function to extract initials from the user name
  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts
      .map(part => part[0].toUpperCase())
      .join('');
    return initials;
  };

  // Use default image with initials if profileImage is not provided
  const profileImageContent = profileImage ? (
    <img src={profileImage} alt="Profile" className="profileImage" />
  ) : (
    <div className="profileImageDefault">
      {getInitials(userName)}
    </div>
  );

  return (
    <div className="profileHeader">
      {/* Dynamically set the profile image */}
     
      <div className="userDetails">
        {/* Display user name and role */}
        <h3>{userName || 'No Name Available'}</h3>
        <p>{userRole || 'No Role Available'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
