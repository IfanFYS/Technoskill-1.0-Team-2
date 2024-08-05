import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import NavbarElement from "./NavbarElement";
import detailsIcon from "../../assets/details.svg";

export default function DetailsPage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");
  const [formattedSalary, setFormattedSalary] = useState("");

  const { id } = useParams();

  const handleEditEmployee = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/employee/edit/${id}`, {
        name,
        division,
        salary,
        profile
      });

      if (response.status !== 201) throw new Error("Add employee failed");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatSalary = (value) => {
    const number = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(number);
  };

  useEffect(() => {
    setFormattedSalary(formatSalary(salary));
  }, [salary]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setSalary(value);
  };

  return (
    <div className="bg-[#1C1917] min-h-screen flex justify-center">
      <NavbarElement bgColor="bg-[#AA603A]" currentId="details" />

      <div className="font-exo2 flex justify-center w-full h-fit overflow-hidden relative mx-10 mt-20 mb-8 sm:mt-24 max-w-lg rounded-lg">
        <form
          id="details"
          className="pb-5 bg-[#3D3029] w-full transition-all duration-1000 ease-in-out overflow-hidden"
        >
          <div className="py-3 text-xl md:text-2xl font-light mb-4 text-white text-center bg-[#2E241F]">
            Edit Existing Employee
          </div>
          <div className="mx-auto w-[80%] text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-[#AD4900] text-transparent bg-clip-text">
            Want to Change the Details?
          </div>
          <div className="mx-auto text-sm sm:text-base text-center text-white my-2 w-[75%]">
            No need to worry! Simply enter any details you would like to change
            below!
          </div>
          <div className="grid grid-rows-[4fr_5fr] md:grid-rows-1 md:grid-cols-[7fr_13fr] md:pl-5">
            <div className="flex items-center">
              <img
                src={detailsIcon}
                className="h-32 object-cover mx-auto"
                alt="Details Icon"
              />
            </div>
            <div>
              <div className="mt-5 relative px-5 text-center">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#2A2522] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Employee Name"
                  required
                />
                <label
                  htmlFor="name"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs"
                >
                  Name
                </label>
              </div>
              <div className="mt-5 relative px-5 text-center">
                <input
                  type="text"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#2A2522] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
                  placeholder="Enter Employee Division"
                  required
                />
                <label
                  htmlFor="division"
                  className="font-semibold text-white pointer-events-none absolute left-5 -top-4 text-xs"
                >
                  Division
                </label>
              </div>
              <div className="mt-5 relative px-5 text-center">
                <input
                  type="text"
                  value={salary}
                  onChange={handleChange}
                  onBlur={() => setSalary(formattedSalary)}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#2A2522] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white valid:text-transparent"
                  placeholder="0.00"
                  required
                />
                <label
                  htmlFor="salary"
                  className="text-xs font-semibold text-white pointer-events-none absolute -top-4 left-5 transition-all duration-300"
                >
                  Employee Salary ( IDR )
                </label>
                <div className="absolute top-1.5 flex items-center pointer-events-none">
                  <span className="text-xs font-light text-white px-2">
                    {formattedSalary}
                  </span>
                </div>
              </div>
              <div className="px-5 grid grid-rows-2 xs:grid-cols-2 xs:grid-rows-1">
                <div className="flex justify-center xs:justify-start">
                  <button
                    type="submit"
                    className="text-sm md:text-[12px] h-8 md:h-6 mt-4 py-[10px] md:py-[8px] px-[30px] md:px-[15px]  flex items-center font-black text-white bg-[#AA603A] hover:bg-[#b05629] rounded-lg"
                    onClick={handleAddEmployee}
                  >
                    SAVE CHANGES
                  </button>
                </div>
                <div className="flex justify-center xs:justify-end">
                  <button
                    type="submit"
                    className="text-sm md:text-[12px] h-8 md:h-6 mt-4 py-[10px] md:py-[8px] px-[30px] md:px-[15px] flex items-center font-black text-white bg-[#AA3A3A] hover:bg-[#af2c2c] rounded-lg"
                    onClick={handleAddEmployee}
                  >
                    DELETE EMPLOYEE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}