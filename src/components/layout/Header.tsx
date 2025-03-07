import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../../api/hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // This effect will run whenever the isAuthenticated state changes
    console.log('Authentication state changed:', isAuthenticated);
  }, [isAuthenticated]);

  const logoutMutation = usePost('/auth/logout', {
    onSuccess: () => {
      localStorage.removeItem('token');
      logout();
    }
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate({});
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">QuickProFixer</div>
        <div className="block lg:hidden">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <nav className={`space-x-4 lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <Link to="/" className="text-gray-700 block lg:inline-block">Home</Link>
          <Link to="/about" className="text-gray-700 block lg:inline-block">About</Link>
          <Link to="/services" className="text-gray-700 block lg:inline-block">Services</Link>
          <Link to="/contact" className="text-gray-700 block lg:inline-block">Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 block lg:inline-block">Profile</Link>
              <button onClick={handleLogout} className="text-gray-700 block lg:inline-block">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 block lg:inline-block">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;