import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/Login';
import RegistrationForm from './components/Register';
import Contact from './components/Contact';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegistrationForm />} />
      <Route path='/contact' element={<Contact/>} />
    
    </Routes>
  );
}

export default App;
