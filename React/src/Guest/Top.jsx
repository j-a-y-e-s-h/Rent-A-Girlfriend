import React, { useState } from 'react';
import LoginPopup from '../Login and signup/LoginPopup';
import SignupPopup from '../Login and signup/SignupPopup';

const Top = () => {
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
    <div  name="main">
      <div className="flex flex-row gap-4 items-end justify-around px-6 mt-64">
        <div className="cursor-pointer" onClick={handleShowLogin}>
          <img src="1.png" alt="Girl" className=" -ml-3 mb-1 " />
          <span className='mx-5 font-medium'>Heer</span>
          <div className="w-20 bg-blue-400 h-[132px] rounded-t-md flex items-center justify-center text-white font-semibold text-2xl">2</div>
        </div>
        <div className="cursor-pointer" onClick={handleShowLogin}>
          <img src="2.png" alt="Girl" className=" -ml-2 mb-1 " />
          <span className='mx-7 font-medium'>Rui</span>
          <div className="w-20 bg-red-400 h-52 rounded-t-md flex items-center justify-center text-white font-semibold text-2xl">1</div>
        </div>
        <div className="cursor-pointer" onClick={handleShowLogin}>
          <img src="3.png" alt="Girl" className=" -ml-2 mb-1 " />
          <span className='mx-5 font-medium'>Hina</span>
          <div className="w-20 bg-green-400 h-24 rounded-t-md flex items-center justify-center text-white font-semibold text-2xl">3</div>
        </div>
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
    </div>
  );
}

export default Top;
