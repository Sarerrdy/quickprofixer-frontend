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
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logoutMutation.mutate({});
  };

  // Close menu when a nav link is clicked (on mobile)
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <div className={`container mx-auto px-4 py-4 flex justify-between ${isMenuOpen ? 'items-start' : 'items-center'} transition-all duration-200`}>
        <div className={`text-2xl font-bold ${isMenuOpen ? 'self-start mt-0' : 'self-center'}`}>
          QuickProFixer
        </div>
        <div className="block lg:hidden">
          {/* Hamburger or X icon */}
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
          >
            {isMenuOpen ? (
              // X icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <nav
          id="main-menu"
          className={`space-x-4 lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:block`}
        >
          <Link to="/" className="text-gray-700 block lg:inline-block" onClick={handleNavClick}>Home</Link>
          <Link to="/about" className="text-gray-700 block lg:inline-block" onClick={handleNavClick}>About</Link>
          <Link to="/services" className="text-gray-700 block lg:inline-block" onClick={handleNavClick}>Services</Link>
          <Link to="/contact" className="text-gray-700 block lg:inline-block" onClick={handleNavClick}>Contact</Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 block lg:inline-block" onClick={handleNavClick}>Profile</Link>
              <button onClick={() => { handleLogout(); handleNavClick(); }} className="text-gray-700 block lg:inline-block">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-gray-700 block lg:inline-block" onClick={handleNavClick}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;