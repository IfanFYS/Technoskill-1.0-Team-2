import express from "express";
import { login, managerInfo, register } from "../controllers/manager.controller.js"

const managerRouter = express.Router();

managerRouter.get("/", login);
managerRouter.post("/", register);
managerRouter.get("/info/:mid", managerInfo);

export default managerRouter