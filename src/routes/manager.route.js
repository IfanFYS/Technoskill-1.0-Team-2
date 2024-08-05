import express from "express";
import { login, register } from "../controllers/manager.controller.js"

const managerRouter = express.Router();

managerRouter.get("/", login);
managerRouter.post("/", register);

export default managerRouter