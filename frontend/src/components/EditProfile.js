import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditProfile.css';

function EditProfile() {
  const [profileData, setProfileData] = useState({
    workExperience: '',
    companyName: '',
    isMentor: false,
    skills: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/profile', profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <label>Work Experience:</label>
        <input
          type="text"
          name="workExperience"
          value={profileData.workExperience}
          onChange={handleChange}
          required
        />
        <label>Company Name:</label>
        <input
          type="text"
          name="companyName"
          value={profileData.companyName}
          onChange={handleChange}
          required
        />
        <label>
          Mentor Status:
          <input
            type="checkbox"
            name="isMentor"
            checked={profileData.isMentor}
            onChange={() => setProfileData({ ...profileData, isMentor: !profileData.isMentor })}
          />
        </label>
        <label>Skills:</label>
        <input
          type="text"
          name="skills"
          value={profileData.skills}
          onChange={handleChange}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
