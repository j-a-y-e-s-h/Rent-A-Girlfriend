import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import SignupPopup from './SignupPopup';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Handle showing/hiding of login popup
  function handleShowLogin() {
    setShowLogin(true);
    setShowSignup(false);
  }

  function handleCloseLogin() {
    setShowLogin(false);
  }

  // Handle showing/hiding of signup popup
  function handleShowSignup() {
    setShowSignup(true);
    setShowLogin(false);
  }

  function handleCloseSignup() {
    setShowSignup(false);
  }

  return (
    <nav className="flex justify-between items-center h-24 bg-slate-800 px-5 sticky z-2 top-0 mt-0.5">
      <div className="flex items-center">
        <a href="/">
          <img src="logo.png" alt="Logo" className="h-[90px]" />
        </a>
      </div>
      <div className="flex items-center space-x-3">
        <a href="/">
          <img src="notification.png" alt="Notification" className="h-16" />
        </a>
        <p className='cursor-pointer' onClick={handleShowLogin}>
          <img src="profile.png" alt="Profile" className="h-[60px]" />
        </p>
          <p className='cursor-pointer text-sm text-white 'onClick={handleShowLogin}>Guest</p>
      </div>

      {/* Login popup */}
      {showLogin && (
        <LoginPopup
          handleCloseLogin={handleCloseLogin}
          handleShowSignup={handleShowSignup}
        />
      )}

      {/* Signup popup */}
      {showSignup && (
        <SignupPopup
          handleCloseSignup={handleCloseSignup}
          handleShowLogin={handleShowLogin}
        />
      )}
    </nav>
  );
}

export default Navbar;
