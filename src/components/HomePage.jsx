import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NavbarElement from "./elements/NavbarElement";
import title from "../assets/title.svg";
import homeIcon from "../assets/home.svg";

export default function HomePage() {
  const [data, setData] = useState([]);

  const handleHomePage = async () => {
    try {
      const response = await axios.post("http://localhost:8000/employee/get");
      console.log(response.data);

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleHomePage();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="bg-[#1C1B17] min-h-screen flex justify-center">
      <NavbarElement bgColor="bg-[#AA8F3B]" currentId="home" />

      <div className="font-exo2 flex-col justify-center w-full overflow-hidden relative mx-10 mt-20 mb-8 sm:mt-24">
        <div className="pt-5 sm:pt-8 pb-8">
          <div className="w-48 sm:w-72 mx-auto mt-4 mb-12 sm:mb-[60px] flex justify-center items-center transition-all duration-1000">
            <img src={title} className=" object-cover mx-auto" />
          </div>
          <div className="italic text-center text-[1.5rem] sm:text-[2rem] font-bold bg-gradient-to-r from-white to-[#E09D1A] text-transparent bg-clip-text">
            Welcome to Team 2&apos;s Technoskill 1.0 Project!
          </div>
          <div className="mx-auto mt-4 mb-7 text-base sm:text-xl text-center text-white my-2 w-[75%]">
            This project serves as a comprehensive{" "}
            <span className="text-[#D4B051] font-bold">
              employee management platform
            </span>{" "}
            designed to streamline HR tasks with a user-friendly interface.
          </div>
          <button className="h-8 sm:h-12 sm:text-xl mt-4 py-[10px] px-[30px] flex items-center m-auto font-black text-white bg-[#AA8F3B] hover:bg-[#cdab48] rounded-lg transition-all sm:mt-4">
            <a href="#home">VIEW DATABASE</a>
          </button>
        </div>
        <div id="home" className="pt-12 sm:pt-16">
          <div className="bg-[#2A2822] mt-4 pb-1 w-full transition-all duration-1000 rounded-lg ease-in-out overflow-hidden">
            <div className="py-3 text-xl md:text-2xl font-light mb-4 text-white text-center bg-[#514A34]">
              Employee Database
            </div>
            <img
              src={homeIcon}
              className="h-24 pb-2 sm:h-32 object-cover mx-auto"
              alt="Home Icon"
            />
            <div className="text-white text-lg md:text-xl font-semibold text-center px-5 my-1">
              Click on a cell to see the details
            </div>
            <ol className="w-full">
              {data.length > 0 ? (
                <>
                  <li className="mt-1 w-full px-5 text-left hidden sm:flex">
                    <div className="w-10 text-sm text-center font-semibold text-white outline-none px-2 rounded-lg mr-1">
                      No
                    </div>
                    <div className="grid grid-cols-[4fr_3fr_2fr] auto-rows-auto px-2 text-sm font-semibold text-white w-full outline-none rounded-l">
                      <span>Name</span>
                      <span>Division</span>
                      <span>Salary</span>
                    </div>
                  </li>
                  {data.map((employee, index) => (
                    <li
                      key={index}
                      className="flex flex-row-reverse items-center my-1 sm:mb-1 w-full px-5 text-left group"
                      onClick={() => {
                        navigate("/home/details");
                      }}
                    >
                      <div className="grid grid-cols-[48px_12px_1fr] auto-rows-auto text-xs font-semibold text-white px-2 py-1 w-full outline-none bg-[#403E36] rounded-lg cursor-pointer transition shadow-xl group-hover:bg-[#5b5a51] sm:grid-cols-[4fr_3fr_2fr]">
                        <div className="my-1 text-center col-span-3 rounded-lg bg-[#2A2822] group-hover:bg-[#403E36] sm:hidden transition">
                          {index + 1}
                        </div>
                        <span className="sm:hidden">Name</span>
                        <span className="text-center sm:hidden">:</span>
                        <div className="font-light">{employee.name}</div>
                        <span className="sm:hidden">Division</span>
                        <span className="text-center sm:hidden">:</span>
                        <div className="font-light">{employee.division}</div>
                        <span className="sm:hidden">Salary</span>
                        <span className="text-center sm:hidden">:</span>
                        <div className="font-light">IDR {employee.salary}</div>
                      </div>
                      <div className="w-10 h-6 hidden text-xs sm:flex justify-center items-center font-semibold shadow-xl text-white py-1 outline-none bg-[#403E36] rounded-lg transition group-hover:bg-[#5b5a51] mr-1">
                        {index + 1}
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <li className="flex items-center justify-center my-1 sm:mb-1 w-full px-5 text-center">
                  <div className="font-semibold text-white px-2 py-1 w-full outline-none bg-[#403E36] rounded-lg shadow-xl">
                    NO DATA
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
