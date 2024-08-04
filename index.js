import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import managerRoute from "./src/routes/manager.route.js";
import employeeRoute from "./src/routes/employee.route.js";

dotenv.config();

const port = 8000; // Isi nomor port di sini;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/manager", managerRoute);
app.use("/employee", employeeRoute);

app.listen(port, () => {
  console.log(`Running on port ${port}!`);
});
