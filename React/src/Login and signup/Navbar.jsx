import React, { useState } from "react";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  function handleShowLogin() {
    setShowLogin(true);
    setShowSignup(false);
  }

  function handleCloseLogin() {
    setShowLogin(false);
  }

  function handleShowSignup() {
    setShowSignup(true);
    setShowLogin(false);
  }

  function handleCloseSignup() {
    setShowSignup(false);
  }

  return (
    <nav className="flex items-center justify-between h-24 flex-wrap bg-slate-800 px-6 py-3 top-0 mt-[0.4px]">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="/">
          <img src="logo.png" alt="Logo" className="h-[73px]" />
        </a>
      </div>
      <div className="block md:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
          onClick={handleShowLogin}
        >
          <img
            src="notification.png"
            alt="Notification"
            className="cursor-pointer h-10"
          />
        </button>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center -mr-6">
          <button
            className="inline-flex items-center px-4 py-2 mr-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            onClick={handleShowLogin}
          >
            <img
              src="notification.png"
              onClick={handleShowLogin}
              alt="Notification"
              className="cursor-pointer h-10"
            />
          </button>
          <p
            className="text-sm text-white mr-4 cursor-pointer"
            onClick={handleShowLogin}
          >
            <img src="profile.png" alt="Profile" className="h-[50px]" />
          </p>
          <p className="text-base font-medium text-white mr-8 cursor-pointer">
            Guest
          </p>
        </div>
      </div>

      {showLogin && (
        <LoginPopup
          handleCloseLogin={handleCloseLogin}
          handleShowSignup={handleShowSignup}
        />
      )}

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
