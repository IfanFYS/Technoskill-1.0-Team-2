import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import NavbarElement from "./elements/NavbarElement";
import title from "../assets/title.svg";
import homeIcon from "../assets/home.svg";
import editIcon from "../assets/edit.svg";
import searchIcon from "../assets/search.svg";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [searchBy, setSearchBy] = useState("name");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const options = [
    { name: "Name", value: "name" },
    { name: "Division", value: "division" },
    { name: "Salary", value: "salary" },
  ];

  const handleHomePage = async () => {
    try {
      const response = await axios.get("http://localhost:8000/employee");
      console.log("Response Data:", response.data); // Log the response data

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleHomePage();
  }, []);

  const navigate = useNavigate();
  const { mid } = useParams();

  return (
    <div className="bg-[#1C1B17] min-h-screen flex justify-center">
      <NavbarElement bgColor="bg-[#AA8F3B]" currentId="home" />

      <div className="font-exo2 flex-col justify-center w-full overflow-hidden relative mx-10 mt-20 mb-8 sm:mt-24">
        <div className="pt-5 sm:pt-8 pb-8">
          <div className="w-72 sm:w-96 mx-auto mt-4 mb-12 sm:mb-[60px] flex justify-center items-center transition-all duration-1000">
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
          <div className="bg-[#2A2822] mt-4 pb-1 w-full transition-all duration-1000 rounded-lg max-w-2xl mx-auto ease-in-out overflow-hidden">
            <div className="py-3 text-xl md:text-2xl font-light mb-4 text-white text-center bg-[#363020]">
              Employee Database
            </div>
            <img
              src={homeIcon}
              className="h-24 pb-2 sm:h-32 object-cover mx-auto"
              alt="Home Icon"
            />
            <div className="hidden sm:flex items-center px-5">
              <div className="mx-2 w-fit text-white">Search by</div>
              <select
                className="w-fit sm:text-lg text-center bg-[#403E36] hover:bg-[#49473f] text-white outline-none px-2 rounded-lg"
                value={searchBy}
                onChange={(e) => setSearchBy(e.target.value)}
              >
                {options.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-1 mb-2 px-5 relative">
              <input
                type="text"
                name="search"
                id="search-box"
                className="w-full sm:text-lg bg-[#403E36] hover:bg-[#49473f] text-white outline-none px-2 rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white focus:border-solid focus:border-[1px] focus:border-white"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
              />
              <span className="absolute right-7 top-1 cursor-pointer">
                <img src={searchIcon} className="w-4 sm:w-5 invert" />
              </span>
            </div>
            {loading ? (
              <div className="flex items-center justify-center my-1 sm:mb-1 w-full px-5 text-center">
                <div className="font-semibold text-white px-2 py-1 w-full outline-none bg-[#403E36] hover:bg-[#49473f] rounded-lg shadow-xl">
                  Loading...
                </div>
              </div>
            ) : (
              <ol>
                {data.length > 0 ? (
                  <>
                    <li className="mt-1 w-full px-5 text-left hidden sm:flex">
                      <div className="w-10 sm:text-lg text-center font-semibold text-white outline-none px-2 rounded-lg mr-0.5">
                        No
                      </div>
                      <div className="w-[40%] sm:text-lg font-semibold text-white outline-none px-2 rounded-lg mx-0.5">
                        Name
                      </div>
                      <div className="w-[30%] sm:text-lg font-semibold text-white outline-none px-2 rounded-lg mx-0.5">
                        Division
                      </div>
                      <div className="w-[30%] sm:text-lg font-semibold text-white outline-none px-2 rounded-lg ml-0.5">
                        Salary
                      </div>
                    </li>
                    {data
                      .filter((item) => {
                        if (search === "") return item;

                        const searchTerm = search.toLowerCase();
                        switch (searchBy) {
                          case "name":
                            return item.name
                              .toLowerCase()
                              .includes(searchTerm);
                          case "division":
                            return item.division
                              .toLowerCase()
                              .includes(searchTerm);
                          case "salary":
                            return item.salary.toString().includes(searchTerm);
                          default:
                            return true;
                        }
                      })
                      .map((employee, index) => (
                        <li
                          key={index}
                          className="flex flex-row items-center my-1 sm:mb-1 w-full px-5 text-left cursor-pointer group"
                          onClick={() => navigate(`/home/${mid}/details/${employee.id}`)} // Navigate to /home/details/:id
                        >
                          <div className="w-10 sm:text-lg text-center bg-[#403E36] group-hover:bg-[#49473f] text-white outline-none px-2 rounded-lg mr-0.5 group-hover:border-solid group-hover:border-[1px] group-hover:border-white">
                            {index + 1}
                          </div>
                          <div className="w-[100%] sm:text-lg bg-[#403E36] group-hover:bg-[#49473f] text-white outline-none px-2 rounded-lg mx-0.5 relative sm:w-[40%] group-hover:border-solid group-hover:border-[1px] group-hover:border-white">
                            {employee.name}
                            <span className="absolute right-1 top-1">
                              <img src={editIcon} className="w-3 invert" />
                            </span>
                          </div>
                          <div className="w-[30%] sm:text-lg bg-[#403E36] group-hover:bg-[#49473f] text-white outline-none px-2 rounded-lg mx-0.5 hidden sm:block group-hover:border-solid group-hover:border-[1px] group-hover:border-white">
                            {employee.division}
                          </div>
                          <div className="w-[30%] sm:text-lg bg-[#403E36] group-hover:bg-[#49473f] text-white outline-none px-2 rounded-lg ml-0.5 hidden sm:block group-hover:border-solid group-hover:border-[1px] group-hover:border-white">
                            {employee.salary}
                          </div>
                        </li>
                      ))}
                  </>
                ) : (
                  <li className="flex items-center justify-center my-1 sm:mb-1 w-full px-5 text-center">
                    <div className="font-semibold text-white px-2 py-1 w-full outline-none bg-[#403E36] hover:bg-[#49473f] rounded-lg shadow-xl">
                      NO DATA
                      <div
                        className="text-xs text-[#44C9DC] text-center font-semibold cursor-pointer"
                        onClick={() => navigate("/new")}
                      >
                        Add Employee
                      </div>
                    </div>
                  </li>
                )}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
