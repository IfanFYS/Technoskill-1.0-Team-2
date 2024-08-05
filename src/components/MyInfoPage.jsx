import { useState, useEffect} from "react";
import axios from "axios";

import NavbarElement from "./elements/NavbarElement";
import myInfoIcon from "../assets/my-info.svg";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const [data, setData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  const [changeEmail, setChangeEmail] = useState("");
  const [changeName, setChangeName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { mid } = useParams();

  const handleInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/manager/info/${mid}`);
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
      const response = await axios.get("http://localhost:8000/manager");
      console.log(response.data);
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
        
      </div>
    </div>
  );
}