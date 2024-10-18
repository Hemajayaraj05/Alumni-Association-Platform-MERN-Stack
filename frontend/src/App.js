import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';
import RegistrationForm from './components/Register';
import MainPage from './components/MainPage';
import EditProfile from './components/EditProfile';
import Contact from './components/Contact';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationForm />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/edit-profile' element={<EditProfile />} />
    </Routes>
  );
}

export default App;
