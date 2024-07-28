import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const handleHomeClick = () => {
    if (user) {
      navigate('/dashboard'); // Redirect to dashboard if logged in
    } else {
      navigate('/'); // Redirect to home if not logged in
    }
  };

  const handleEmployeeListClick = () => {
    if (user) {
      navigate('/employee-list'); // Redirect to employee list if logged in
    }
  };

  const handleLogout = () => {
    onLogout(); // Function to log out the user
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav>
        {user ? (
          <>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleEmployeeListClick}>Employee List</button>
            <span>
              {user.username} - <button onClick={handleLogout} className="logout-button">Logout</button>
            </span>
          </>
        ) : (
          <>
            {location.pathname === '/' && <Link to="/signup">Sign Up</Link>}
            {location.pathname === '/signup' && <Link to="/">Log In</Link>}
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
