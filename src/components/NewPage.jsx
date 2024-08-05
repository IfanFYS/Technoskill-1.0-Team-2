import { useState, useEffect } from "react";
import axios from "axios";

import NavbarElement from "./elements/NavbarElement";
import newIcon from "../assets/new.svg";

export default function NewPage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");

  const handleAddEmployee = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Parse the salary input as a float to ensure it's a number
      const numericSalary = parseFloat(salary.replace(/,/g, ""));

      if (isNaN(numericSalary)) {
        throw new Error("Invalid salary input");
      }

      const response = await axios.post("http://localhost:8000/employee/add", {
        name,
        division,
        salary: numericSalary,
      });

      if (response.status !== 201) throw new Error("Add employee failed");

      console.log("Employee added successfully:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const formatSalary = (value) => {
    const number = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
    }).format(number);
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setSalary(value);
  };

  return (
    <div className="bg-[#171C17] min-h-screen flex justify-center">
      <NavbarElement bgColor="bg-[#45AC3B]" currentId="details" />

      <div className="font-exo2 flex justify-center w-full h-fit overflow-hidden relative mx-10 mt-20 mb-8 sm:mt-24 max-w-lg rounded-lg">
        <form
          id="new"
          className="pb-5 bg-[#232A22] w-full transition-all duration-1000 ease-in-out overflow-hidden"
          onSubmit={handleAddEmployee} // Use onSubmit for form
        >
          <div className="py-3 text-xl md:text-2xl font-light mb-4 text-white text-center bg-[#354C33]">
            Add New Employee
          </div>
          <div className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#2BA630] to-white text-transparent bg-clip-text">
            Hiring a New Employee?
          </div>
          <div className="mx-auto text-sm sm:text-base text-center text-white my-2 w-[75%]">
            No worries, we got you covered! Just enter the details of your new
            employee below!
          </div>
          <div className="grid grid-rows-[4fr_5fr] md:grid-rows-1 md:grid-cols-[7fr_13fr] md:pl-5">
            <div className="flex items-center">
              <img
                src={newIcon}
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
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#2F382E] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
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
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#2F382E] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white"
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
                  onChange={handleSalaryChange}
                  onBlur={() => setSalary(formatSalary(salary))}
                  className="text-xs font-light text-white px-2 h-6 w-full outline-none bg-[#2F382E] peer rounded-lg placeholder:italic placeholder:opacity-60 placeholder-white shadow-xl focus:border-solid focus:border-[1px] focus:border-white valid:text-transparent"
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
                    {formatSalary(salary)}
                  </span>
                </div>
              </div>
              <button
                type="submit" // Set type to "submit"
                className="h-8 mt-4 py-[10px] px-[30px] flex items-center m-auto font-black text-white shadow-xl bg-[#4B9145] hover:bg-[#61ba59] rounded-lg transition-all "
              >
                ADD EMPLOYEE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
