import express from "express";
import {
  addEmployee,
  deleteEmployee,
  editEmployee,
  getAllEmployee,
  getOneEmployeeByID
} from "../controllers/employee.controller.js";

const employeeRouter = express.Router();

employeeRouter.post("/", addEmployee);
employeeRouter.get("/", getAllEmployee);
employeeRouter.get("/:id", getOneEmployeeByID);
employeeRouter.put("/:id", editEmployee);
employeeRouter.delete("/:id", deleteEmployee); 

export default employeeRouter;
