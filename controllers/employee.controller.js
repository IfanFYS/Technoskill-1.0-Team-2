// These functions does everything related to employee adding

// This connects to the postgreSQL on connect.js
const pg = require("../utils/connect");

// This function adds a new entry to the employee table
exports.addEmployee = async function addEmployee(req, res) {
  
  try {
    const { name, division, salary } = req.body;
    const response = await pg.query(
      "INSERT INTO employee (name, division, salary) VALUES ($1, $2, $3) RETURNING *",
      [name, division, salary]
    );

    res.status(201).json(response.rows[0]); // Returns http status code 201.
  } catch (error) {
    res.status(500).json(error.message); // Returns http status code 500 when encountered an error. Indicates an error in the server
  }
};

exports.getAllEmployee = async function getAllEmployee(req, res) {
  try {
    const response = await pg.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// This function searches and shows employees using name
exports.getEmployeesByName = async function getEmployeesByName(req, res) {
  try {
    const { name } = req.body;
    const response = await pg.query(
      "SELECT * FROM employee WHERE NAME = ($1)",
      [name]
    );
    
    if (response.rows.length == 0) {
      // If the name is not found on the table, the row's length would be zero.
      // this code will return a http code 404.
      res.status(404).json({
        message: "Employee not found"
      });
    } else {
      // If the name is on the table
      res.status(200).json(response.rows);
    }

  } catch (error) {
    res.status(500).json(error.message);
  }
};

// This function searches and shows employees in a division
exports.getEmployeesByDivision = async function getEmployeesByDivision (req, res) {
  try {
    const { division } = req.body;
    const response = await.pq.query (
      "SELECT * FROM employee WHERE DIVISION = ($1)",
      [division]
    );

    if (response.rows.length == 0) {
      res.status(404).json({
        message:"Division not found or empty"
      });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// This function searches all employees that has a salary between an interval
exports.getEmployeesSalaryBetween = async getEmployeesSalaryBetween (req, res) {
  try {
    const { min, max } = req.body;
    const response = await.pq.query (
      "SELECT * FROM employee WHERE SALARY >= ($1) AND SALARY <= ($2)",
      [min, max];
    )
    if (response.rows.length == 0) {
      res.status(404).json({
        message:"No employees between the salary range"
      });
    } else {
      res.status(200).json(response.rows)
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// This function searches an employee by its id
exports.getOneEmployeeByID = async function getOneEmployeeByID(req, res) {
  try {
    const { id } = req.body;

    const response = await pg.query(
      "SELECT * FROM employee WHERE ID = ($1)",
      [id]
    );
    
    if (response.rows.length == 0) {
      // If the name is not found on the table, the row's length would be zero.
      // this code will return a http code 404.
      res.status(404).json({
        message: "Employee not found"
      });
    } else {

    }
  } catch {
    // If the name is on the table
    res.status(200).json(response.rows[0]);
  }
}