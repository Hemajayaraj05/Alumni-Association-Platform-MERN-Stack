import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './User/styles/Editprofile.css';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mentorStatus: '',
    skills: '',
    githubLink: '',
    codingPlatformLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateProfile = async () => {
    const userId = "67378cd727b03870a4849539"; 
    setIsSubmitting(true); 
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/updateProfile/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        alert('Profile updated successfully');
        setFormData({
          name: '',
          company: '',
          mentorStatus: '',
          skills: '',
          githubLink: '',
          codingPlatformLink: '',
        });
        navigate('/main');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editbefr-container">
      <h2 className="editbefr-title">Update Profile</h2>
      <form className="editbefr-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="editbefr-input"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          className="editbefr-input"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        />
        <input
          type="text"
          className="editbefr-input"
          name="mentorStatus"
          placeholder="Mentor Status"
          value={formData.mentorStatus}
          onChange={(e) => setFormData({ ...formData, mentorStatus: e.target.value })}
        />
        <input
          type="text"
          className="editbefr-input"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
        <input
          type="text"
          className="editbefr-input"
          name="githubLink"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
        />
        <input
          type="text"
          className="editbefr-input"
          name="codingPlatformLink"
          placeholder="Coding Platform Link"
          value={formData.codingPlatformLink}
          onChange={(e) => setFormData({ ...formData, codingPlatformLink: e.target.value })}
        />
        <button
          type="button"
          className="editbefr-button"
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
