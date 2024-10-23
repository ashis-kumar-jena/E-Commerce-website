// src/components/Navbar.jsx
import React from 'react';
import { assets } from '../assets/assets.js'; // Correct path to assets.js

const Navbar = () => {
  return (
    <div>
      <img src={assets.img} alt='Logo' />
      <button>Logout</button>
    </div>
  );
};

export default Navbar;
