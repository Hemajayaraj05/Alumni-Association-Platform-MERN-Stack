import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './User/styles/Editprofile.css';

const EditProfile = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mentorStatus: false, // Default to Boolean
    skills: '',
    githubLink: '',
    codingPlatformLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch user details when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.status === 200) {
          setFormData({
            ...response.data,
            mentorStatus: response.data.mentorStatus || false, // Ensure Boolean
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error.response?.data || error.message);
      }
    };
    fetchUserDetails();
  }, []);

  const updateProfile = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/updateProfile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        
        alert('Profile updated successfully');
        navigate('/main');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Update Profile</h2>
      <form className="edit-profile-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="edit-profile-input"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          className="edit-profile-input"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        <label className="edit-profile-label">
          MentorStatus:
          <select
            className="edit-profile-select"
            name="mentorStatus"
            value={formData.mentorStatus ? "true" : "false"}
            onChange={(e) =>
              setFormData({ ...formData, mentorStatus: e.target.value === "true" })
            }
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
        <input
          type="text"
          className="edit-profile-input"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
        <input
          type="text"
          className="edit-profile-input"
          name="githubLink"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
        />
        <input
          type="text"
          className="edit-profile-input"
          name="codingPlatformLink"
          placeholder="Coding Platform Link"
          value={formData.codingPlatformLink}
          onChange={(e) => setFormData({ ...formData, codingPlatformLink: e.target.value })}
        />
        <button
          type="button"
          className="edit-profile-button"
          onClick={updateProfile}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
