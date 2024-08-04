import express from "express";
import {addEmployee, getAllEmployee, getOneEmployeeByID} from "../controllers/employee.controller.js"

const employeeRouter = express.Router();

employeeRouter.post("/add", addEmployee);
employeeRouter.get("/", getAllEmployee);
employeeRouter.get("/:id", getOneEmployeeByID);

export default employeeRouter