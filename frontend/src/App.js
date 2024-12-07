import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/User/Login';
import RegistrationForm from './components/User/Register';
import Contact from './components/User/Contact';
import AdminDashboard from './components/Admin/AdminDashboard';
import ManageUsers from './components/Admin/ManageUsers';
import AdminLogin from './components/Admin/AdminLogin';
import MainPage from './components/MainPage';
import AddPost from './components/AddPost'
import EditProfile from './components/EditProfile'; // Import EditProfile

function App() {
  const userRole = localStorage.getItem('role');

  return (
    <Routes>
      {/* User routes */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationForm />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/main/*' element={<MainPage />} />
      <Route path="/profile/add-post" element={<AddPost />} />

      {/* Route for Edit Profile */}
      <Route path='/profile/edit' element={<EditProfile />} />

      {/* Admin routes - protected by role */}
      <Route 
        path='/admin-dashboard' 
        element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/admin-login" />} 
      />
      <Route 
        path='/admin/manage-users' 
        element={userRole === 'admin' ? <ManageUsers /> : <Navigate to="/admin-login" />} 
      />

      {/* Admin login */}
      <Route path='/admin-login' element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
