import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">Quadrio Admin Page</div>
        <div>
          <Link to="/" className="px-3 py-2 text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/admin/signup" className="px-3 py-2 text-gray-700 hover:text-gray-900">Sign Up</Link>
          <Link to="/admin/signin" className="px-3 py-2 text-gray-700 hover:text-gray-900">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
