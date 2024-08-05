import express from "express";
import {addEmployee, editEmployee, getAllEmployee, getOneEmployeeByID} from "../controllers/employee.controller.js"

const employeeRouter = express.Router();

employeeRouter.post("/add", addEmployee);
employeeRouter.get("/", getAllEmployee);
employeeRouter.get("/:id", getOneEmployeeByID);
employeeRouter.put("/edit/:id", editEmployee);

export default employeeRouter