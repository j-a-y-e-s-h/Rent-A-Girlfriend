import React, { useState, useEffect } from "react";
import classNames from "classnames";

function SignupPopup({ handleCloseSignup, handleShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordChange = (e) => {
    const passwordInput = e.target.value;
    const confirmPasswordInput =
      document.getElementById("confirmPassword").value;
    if (passwordInput !== confirmPasswordInput) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const passwordInput = document.getElementById("password").value;
    const confirmPasswordInput = e.target.value;
    if (passwordInput !== confirmPasswordInput) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setUserExists(true);
          setRegistrationSuccess(false);
        } else {
          setUserExists(false);
          setRegistrationSuccess(true);
          setTimeout(() => {
            handleShowLogin();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-75">
      <div
        className={classNames(
          "bg-white p-6 rounded-lg text-center",
          { "w-full max-w-md": screenSize < 640 },
          { "w-80": screenSize >= 640 }
        )}
      >
        <div className="flex justify-end">
          <span
            className="inline-block align-middle cursor-pointer"
            onClick={handleCloseSignup}
          >
            <i className="uil uil-times form_close text-2xl text-gray-600 hover:text-gray-900"></i>
          </span>
        </div>
        <h2 className="text-xl mb-4 font-semibold">Sign up</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center text-sm"
        >
          <div className="mb-4 flex items-center justify-start w-full">
            <span className="inline-block align-middle mr-2.5">
              <i className="uil uil-user text-xl text-gray-800 "></i>
            </span>
            <input
              className={classNames(
                "border-b-2 border-gray-400 appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                { "w-full sm:w-auto": screenSize < 640 },
                { "w-full": screenSize >= 640 }
              )}
              id="name"
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-start w-full">
            <span className="inline-block align-middle mr-2.5">
              <i className="uil uil-envelope-alt text-xl text-gray-800 "></i>
            </span>
            <input
              className={classNames(
                "border-b-2 border-gray-400 appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                { "w-full sm:w-auto": screenSize < 640 },
                { "w-full": screenSize >= 640 }
              )}
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center justify-start w-full">
            <span className="text-xl text-gray-800 inline-block align-middle mr-2.5">
              <i className="uil uil-lock password-icon"></i>
            </span>
            <input
              className={classNames(
                "border-b-2 border-gray-400 appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                { "w-full sm:w-auto": screenSize < 640 },
                { "w-full": screenSize >= 640 }
              )}
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handlePasswordChange(e);
              }}
            />
            <span
              className="inline-block align-middle pl-1.5 text-lg cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handlePasswordVisibility}
            >
              {passwordVisible ? (
                <i className="uil uil-eye password-icon"></i>
              ) : (
                <i className="uil uil-eye-slash password-icon"></i>
              )}
            </span>
          </div>
          <div className="mb-4 flex items-center justify-start w-full">
            <span className="text-xl text-gray-800 inline-block align-middle mr-2.5">
              <i className="uil uil-lock password-icon"></i>
            </span>
            <input
              className={classNames(
                "border-b-2 border-gray-400 appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                { "w-full sm:w-auto": screenSize < 640 },
                { "w-full": screenSize >= 640 }
              )}
              id="confirmPassword"
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm password"
              required
              onChange={handleConfirmPasswordChange}
            />
            <span
              className="inline-block align-middle text-lg pl-1.5 cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={handleConfirmPasswordVisibility}
            >
              {confirmPasswordVisible ? (
                <i className="uil uil-eye password-icon"></i>
              ) : (
                <i className="uil uil-eye-slash password-icon"></i>
              )}
            </span>
          </div>
          {passwordMismatch && (
            <p className="text-red-500">Passwords do not match</p>
          )}
          {userExists && (
            <p className="text-red-500">User already exists</p>
          )}
          {registrationSuccess && (
            <p className="text-green-500">Registration successful!</p>
          )}
          <button
            className={classNames(
              "bg-blue-500 text-white py-2.5 hover:text-lg hover:-mb-1 text-base px-8 sm:px-16 rounded-lg focus:outline-none focus:shadow-outline self-center mt-4 mb-25px hover:shadow-lg hover:mb-21px hover:shadow-blue-500/50 hover:bg-blue-700",
              { "w-full sm:w-auto": screenSize < 640 }
            )}
            type="submit"
            disabled={passwordMismatch}
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            type="button"
            onClick={handleShowLogin}
          >
            Login!
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPopup;
