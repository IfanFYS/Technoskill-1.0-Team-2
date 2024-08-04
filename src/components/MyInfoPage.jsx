import { useState, useEffect } from "react";
import axios from "axios";

import NavbarElement from "./elements/NavbarElement";
import myInfoIcon from "../assets/my-info.svg";

export default function DetailsPage() {
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const [changeEmail, setChangeEmail] = useState("");
  const [changeName, setChangeName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleInfo = async () => {
    try {
      const response = await axios.post("http://localhost:8000/employee/get");
      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleInfo();
  }, []);

  const handleChange = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/login", {
        changeEmail,
        changeName,
        changePassword,
      });
      if (response.status !== 200) throw new Error("Login failed");
      console.log(response.data);
      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const validatePassword = (password, confirmNewPassword) => {
    // Check if confirm password is filled
    if (password.length > 0 && confirmNewPassword.length === 0) {
      return { isValid: false, message: "Confirm your password." };
    }

    // Check if passwords match
    if (password.length > 0 && password !== confirmNewPassword) {
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

  const passwordValidation = validatePassword(
    changePassword,
    confirmNewPassword
  );
  const emailValidation = validateEmail(changeEmail);

  return (
    <div className="bg-[#171A1C] min-h-screen flex justify-center">
      <NavbarElement bgColor="bg-[#4186AC]" currentId="my-info" />

      <div className="flex w-full flex-wrap items-center justify-center pt-12 sm:pt-16">
        <div className="font-exo2 flex justify-center w-full h-fit overflow-hidden relative mx-5 mt-3  max-w-lg rounded-lg transition-all duration-300">
          <div
            id="my-info"
            className=" bg-[#2E3538] w-full h-full transition-all duration-1000 ease-in-out overflow-hidden"
          >
            <div className="py-3 text-xl md:text-2xl font-light mb-4 text-white text-center bg-[#1F292E]">
              Account Information
            </div>
            <div className="grid grid-rows-[4fr_5fr] md:grid-rows-1 md:grid-cols-[7fr_13fr] md:pl-5 md:mb-4">
              <div className="my-3 flex items-center">
                <img
                  src={myInfoIcon}
                  className="h-32 object-cover mx-auto"
                  alt="Details Icon"
                />
              </div>
              <div>
                <div className="mt-5 relative px-5 text-center">
                  <div
                    type="email"
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    required
                  >
                    {data.email}
                  </div>
                  <label
                    htmlFor="email"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs"
                  >
                    Email
                  </label>
                </div>
                <div className="mt-5 relative px-5 text-center">
                  <div
                    type="text"
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    required
                  >
                    {data.name}
                  </div>
                  <label
                    htmlFor="name"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs"
                  >
                    Name
                  </label>
                </div>
                <div className="mt-5 relative px-5 text-center">
                  <div
                    type="password"
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    required
                  >
                    {data.password}
                  </div>
                  <label
                    htmlFor="password"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs"
                  >
                    Password
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="change-data"
          className="font-exo2 flex justify-center w-full h-fit overflow-hidden relative mx-5 mt-3 mb-8 max-w-lg rounded-lg"
        >
          <form
            id="change-data"
            className=" bg-[#2E3538] w-full h-full transition-all duration-1000 ease-in-out overflow-hidden"
          >
            <div className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#2A75AB] to-white text-transparent bg-clip-text mt-2">
              Want to Edit Your Account?{" "}
            </div>
            <div className="mx-auto text-sm sm:text-base text-center text-white my-2 w-[75%]">
              This is the account settings page. You can view and edit your
              account information below!
            </div>
            <div className="grid grid-rows-1">
              <div>
                <div className="mt-5 relative w-full px-5 text-center">
                  <input
                    type="text"
                    value={changeName}
                    onChange={(e) => setChangeName(e.target.value)}
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    placeholder="Enter Your Name"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                  >
                    Update Name
                  </label>
                </div>
                <div className="mt-5 relative w-full px-5 text-center">
                  <input
                    type="email"
                    value={changeEmail}
                    onChange={(e) => setChangeEmail(e.target.value)}
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    placeholder="Enter Your New Email"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                  >
                    Update Email
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
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    placeholder="Enter Your Old Password"
                    required
                  />
                  <label
                    htmlFor="old-password"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                  >
                    Old Password
                  </label>
                </div>
                <div className="mt-5 relative w-full px-5 text-center">
                  <input
                    type="password"
                    value={changePassword}
                    onChange={(e) => setChangePassword(e.target.value)}
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    placeholder="Enter Your New Password"
                    required
                  />
                  <label
                    htmlFor="new-password"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                  >
                    New Password
                  </label>
                </div>
                <div className="mt-5 relative w-full px-5 text-center">
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#454F54] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                    placeholder="Confirm Your New Password"
                    required
                  />
                  <label
                    htmlFor="confirm-new-password"
                    className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs transition-all duration-300"
                  >
                    Confirm New Password
                  </label>
                </div>
                <div className="relative">
                  <div className="font-extralight italic text-white text-[10px] pl-5">
                    *Make sure to use a{" "}
                    <span className="font-bold">strong</span> password
                  </div>
                  <div
                    className={`${
                      passwordValidation.isValid ? "hidden" : ""
                    } font-semibold italic text-red-600 text-[10px] pl-5`}
                  >
                    {passwordValidation.message}
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-8 mt-2 mb-2 py-[10px] px-[30px] flex items-center m-auto font-black text-white shadow-xl bg-[#325264] hover:bg-[#46738d] rounded-lg transition-all sm:mt-4"
                  onClick={handleChange}
                  disabled={
                    !passwordValidation.isValid || !emailValidation.isValid
                  }
                >
                  UPDATE CHANGES
                </button>
                <div
                  className={`${
                    isUpdated ? "" : "hidden"
                  } text-xs text-white text-center cursor-pointer mb-2`}
                >
                  Your changes have been{" "}
                  <span className="text-[#62FF3B]">saved!</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}