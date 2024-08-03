import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoginElement from "./elements/LoginElement";

import loginIcon from "../assets/login.svg";
import registerIcon from "../assets/register.svg";
import eyeIcon from "../assets/eye.svg";
import eyeOffIcon from "../assets/eye-off.svg";

export default function LoginPage() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // Show Password
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const toggleRegPassword = () => {
    setShowRegPassword(!showRegPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password, confirmPassword) => {
    // Check if confirm password is filled
    if (password.length > 0 && confirmPassword.length === 0) {
      return { isValid: false, message: "Confirm your password." };
    }

    // Check if passwords match
    if (password.length > 0 && password !== confirmPassword) {
      return { isValid: false, message: "Passwords do not match." };
    }

    // Check password length
    if (password.length > 0 && password.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long.",
      };
    }

    // Check for at least one uppercase letter
    if (password.length > 0 && !/[A-Z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter.",
      };
    }

    // Check for at least one lowercase letter
    if (password.length > 0 && !/[a-z]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one lowercase letter.",
      };
    }

    // Check for at least one number
    if (password.length > 0 && !/\d/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one number.",
      };
    }

    // Check for at least one special character
    if (password.length > 0 && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return {
        isValid: false,
        message: "Password must contain at least one special character.",
      };
    }

    // If all checks pass
    return { isValid: true, message: "Password is valid." };
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length > 0 && !regex.test(String(email).toLowerCase())) {
      return { isValid: false, message: "Email is invalid." };
    }

    return { isValid: true, message: "Email is valid." };
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/login", {
        email,
        password,
      });
      if (response.status !== 200) throw new Error("Login failed");
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/login", {
        name,
        password,
      });
      if (response.status !== 200) throw new Error("Login failed");
      console.log(response.data);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const regPasswordValidation = validatePassword(regPassword, confirmPassword);
  const regEmailValidation = validateEmail(regEmail);
  const emailValidation = validateEmail(email);

  return (
    <div
      className={`${
        isRegister ? "bg-[#18171C]" : "bg-[#1C1719]"
      } min-h-screen flex justify-center transition duration-1000`}
    >
      <LoginElement
        bgColor={isRegister ? "bg-[#593BAB]" : "bg-[#AA3A6D]"}
        currentId={isRegister ? "register" : "login"}
        isRegister={isRegister}
        toggleRegister={toggleRegister}
      />

      <div className="font-exo2 flex justify-center w-full h-fit overflow-hidden relative mx-10 mt-20 mb-8 sm:mt-24 max-w-lg rounded-lg transition-all duration-300">
        <form
          id="register"
          className={`${
            isRegister ? "relative" : "absolute"
          } bg-[#3B354C] w-full h-full pb-2 transition-all duration-1000 ease-in-out overflow-hidden`}
        >
          <div className="py-3 text-xl bg-[#272334] md:text-2xl mb-4 font-light text-white text-center">
            Register Your Account
          </div>
          <div className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-[#7F51FB] text-transparent bg-clip-text">
            Welcome to Team 2&apos;s Project!
          </div>
          <div className="mx-auto text-sm sm:text-base text-center text-white my-2 w-[75%]">
            Is this your first time here? If so, please create your account
            below!
          </div>
          <div className="grid grid-rows-[1fr_2fr] md:grid-rows-1 md:grid-cols-[7fr_13fr] md:pl-5">
            <div className="flex items-center">
              <img
                src={registerIcon}
                className="h-28 md:h-36 object-cover mx-auto"
              />
            </div>
            <div>
              <div className="mt-5 relative w-full px-5 text-center">
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#4e4667] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Your Name"
                  required
                />
                <label
                  htmlFor="name"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                >
                  Name
                </label>
              </div>
              <div className="mt-5 relative w-full px-5 text-center">
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#4e4667] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Your Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                >
                  Email
                </label>
              </div>
              <div
                className={`${
                  regEmailValidation.isValid ? "hidden" : ""
                } font-semibold italic text-red-600 text-[10px] pl-5`}
              >
                {regEmailValidation.message}
              </div>
              <div className="mt-5 relative w-full px-5 text-center">
                <input
                  type={showRegPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#4e4667] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Your Password"
                  required
                />
                <span
                  className="absolute right-7 top-1 cursor-pointer"
                  onClick={toggleRegPassword}
                >
                  <img
                    src={showRegPassword ? eyeIcon : eyeOffIcon}
                    className="w-5 invert"
                  />
                </span>
                <label
                  htmlFor="password"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                >
                  Password
                </label>
              </div>
              <div className="mt-5 relative w-full px-5 text-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#4e4667] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Confirm Your Password"
                  required
                />
                <span
                  className="absolute right-7 top-1 cursor-pointer"
                  onClick={toggleConfirmPassword}
                >
                  <img
                    src={showConfirmPassword ? eyeIcon : eyeOffIcon}
                    className="w-5 invert"
                  />
                </span>
                <label
                  htmlFor="confirm-password"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                >
                  Confirm Password
                </label>
              </div>
              <div className="relative">
                <div className="font-extralight italic text-white text-[10px] pl-5">
                  *Make sure to use a <span className="font-bold">strong</span>{" "}
                  password
                </div>
                <div
                  className={`${
                    regPasswordValidation.isValid ? "hidden" : ""
                  } font-semibold italic text-red-600 text-[10px] pl-5`}
                >
                  {regPasswordValidation.message}
                </div>
              </div>
              <button
                type="submit"
                className="h-8 mt-4 py-[10px] px-[30px] flex items-center m-auto font-black text-white shadow-xl bg-[#6441c4] hover:bg-[#593BAB] rounded-lg transition-all sm:mt-4"
                onClick={handleRegister}
                disabled={
                  !regPasswordValidation.isValid || !regEmailValidation.isValid
                }
              >
                REGISTER
              </button>
              <div className="text-xs text-white text-center mt-3">
                Already have an account?
              </div>
              <div
                className="text-xs text-[#44C9DC] text-center font-semibold cursor-pointer"
                onClick={toggleRegister}
              >
                Log In Here!
              </div>
            </div>
          </div>
        </form>
        <form
          id="login"
          className={`${
            isRegister ? "-translate-x-[100%] absolute" : "relative"
          } bg-[#46393F] w-full h-full pb-2 transition-all duration-1000 ease-in-out overflow-hidden`}
        >
          <div className="py-3 text-xl bg-[#3D2932] md:text-2xl mb-4 font-light text-white text-center">
            Log In to Your Account
          </div>
          <div className="text-center text-2xl font-bold bg-gradient-to-r from-[#FF0075] to-white text-transparent bg-clip-text">
            Welcome Back!
          </div>
          <div className="mx-auto text-center text-white my-2 w-[75%]">
            Before accessing the database, please enter your account details
            below!
          </div>
          <div className="grid grid-rows-[3fr_4fr] md:grid-rows-1 md:grid-cols-[3fr_7fr] md:pl-5">
            <div className="flex items-center">
              <img
                src={loginIcon}
                className="h-28 md:h-36 object-cover mx-auto"
              />
            </div>
            <div>
              <div className="mt-5 relative w-full px-5 text-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#765F66] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Your Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                >
                  Email
                </label>
              </div>
              <div
                className={`${
                  emailValidation.isValid ? "hidden" : ""
                } font-semibold italic text-red-600 text-[10px] pl-5`}
              >
                {emailValidation.message}
              </div>
              <div className="mt-5 relative w-full px-5 text-center">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#765F66] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Your Password"
                  required
                />
                <span
                  className="absolute right-7 top-1 cursor-pointer"
                  onClick={toggleLoginPassword}
                >
                  <img
                    src={showLoginPassword ? eyeIcon : eyeOffIcon}
                    className="w-5 invert"
                  />
                </span>
                <label
                  htmlFor="password"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="h-8 mt-4 py-[10px] px-[30px] flex items-center m-auto font-black text-white shadow-xl bg-[#E55F9B] hover:bg-[#AA3A6D] rounded-lg transition-all "
                onClick={handleLogin}
              >
                LOGIN
              </button>
              <div className="text-xs text-white text-center mt-3">
                Don&apos;t have any account?
              </div>
              <div
                className="text-xs text-[#44C9DC] text-center font-semibold cursor-pointer"
                onClick={toggleRegister}
              >
                Register Here!
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
