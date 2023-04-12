import { useState, useEffect } from "react";

function LoginPopup({ handleCloseLogin, handleShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupLoginVisible, setPopupLoginVisible] = useState(false);
  const [popupLoginText, setPopupLoginText] = useState("");

  useEffect(() => {
    let timer;
    if (popupVisible) {
      timer = setTimeout(() => {
        setPopupVisible(false);
        setPopupText("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [popupVisible]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
        if (data.status === "ok") {
          setPopupLoginText("Login Successful");
          setPopupLoginVisible(true);
          window.localStorage.setItem("token", data.data);
          setTimeout(() => {
            window.location.href = "./NewHome";
          }, 1200);
        } else if (data.error === "Invalid Password") {
          setPopupText("Invalid Password");
          setPopupVisible(true);
        } else if (data.error === "User Not Found") {
          setPopupText("User not found");
          setPopupVisible(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-75">
      {popupVisible && (
        <div className="fixed center-0 z-[60] px-4 py-2 w-48 rounded-md bg-red-500 text-white text-center">
          {popupText}
        </div>
      )}
      {popupLoginVisible && (
        <div className="fixed center-0 z-[60] px-4 py-2 w-48 rounded-md bg-green-500 text-white text-center">
          {popupLoginText}
        </div>
      )}
      <div className="bg-white p-6 rounded-lg relative h-[402px] w-[330px] sm:max-w-md">
        <div className="flex justify-end">
          <span
            className="inline-block align-middle cursor-pointer"
            onClick={handleCloseLogin}
          >
            <i className="uil uil-times form_close text-gray-600 hover:text-gray-900 text-2xl"></i>
          </span>
        </div>
        <h2 className="text-[22px] mb-4 text-center font-semibold">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 mt-6 text-sm"
        >
          <div className="flex items-center mb-0.5">
            <i className="uil uil-envelope-alt email mr-2.5 text-xl text-gray-800"></i>
            <input
              className="border-b-2 border-gray-400 appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center relative ">
            <i className="uil uil-lock password mr-2.5 text-xl text-gray-800 "></i>
            <input
              className="border-b-2 border-gray-400 appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="inline-block align-middle text-lg pl-1.5 cursor-pointer text-gray-600 hover:text-gray-900 focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <i className="uil uil-eye form_close h-6 w-6 text-xl mr-1.5"></i>
              ) : (
                <i className="uil uil-eye-slash form_close h-6 w-6 text-xl mr-1.5"></i>
              )}
            </button>
          </div>
          <div className="flex items-center mb-4 ml-1">
            <input
              className="checked:bg-blue-600 checked:border-transparent mr-2 rounded border-gray-500 hover:border-gray-900 border-solid outline-none transition-all duration-150 ease-linear"
              type="checkbox"
              id="terms-and-conditions"
              name="terms-and-conditions"
              required
            />
            <label
              htmlFor="terms-and-conditions"
              className="text-gray-600 text-xs cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-900"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            className="bg-blue-500 hover:shadow-lg mb-[25px] hover:mb-[21px] hover:shadow-blue-500/50 hover:bg-blue-700 hover:text-base text-white py-3 text-sm px-20 rounded-lg focus:outline-none focus:shadow-outline self-center"
            type="submit"
          >
            Login now
          </button>
        </form>
        <p className="text-center text-sm ">
          Don't have an account?{" "}
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            type="button"
            onClick={handleShowSignup}
          >
            Sign up!
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPopup;
