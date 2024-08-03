// This connects to the PostgreSQL on connect.js
const pg = require("../utils/connect");

// Function to add a new employee
exports.addEmployee = async function addEmployee(req, res) {
  try {
    const { name, division, salary } = req.body;
    const response = await pg.query(
      "INSERT INTO employee (name, division, salary) VALUES ($1, $2, $3) RETURNING *",
      [name, division, salary]
    );

    res.status(201).json(response.rows[0]); // Returns HTTP status code 201.
  } catch (error) {
    res.status(500).json(error.message); // Returns HTTP status code 500 if an error is encountered.
  }
};

// Function to get all employees
exports.getAllEmployee = async function getAllEmployee(req, res) {
  try {
    const response = await pg.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Function to search employees by name
exports.getEmployeesByName = async function getEmployeesByName(req, res) {
  try {
    const { name } = req.body;
    const response = await pg.query(
      "SELECT * FROM employee WHERE NAME = $1",
      [name]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Function to search employees by division
exports.getEmployeesByDivision = async function getEmployeesByDivision(req, res) {
  try {
    const { division } = req.body;
    const response = await pg.query(
      "SELECT * FROM employee WHERE DIVISION = $1",
      [division]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Division not found or empty" });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Function to search employees by salary range
exports.getEmployeesSalaryBetween = async function getEmployeesSalaryBetween(req, res) {
  try {
    const { min, max } = req.body;
    const response = await pg.query(
      "SELECT * FROM employee WHERE SALARY >= $1 AND SALARY <= $2",
      [min, max]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "No employees in the salary range" });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Function to search an employee by ID
exports.getOneEmployeeByID = async function getOneEmployeeByID(req, res) {
  try {
    const { id } = req.body;
    const response = await pg.query(
      "SELECT * FROM employee WHERE ID = $1",
      [id]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Function to edit an existing employee
exports.editEmployee = async function editEmployee(req, res) {
  try {
    const { id, name, division, salary } = req.body;
    const response = await pg.query(
      "UPDATE employee SET name = $1, division = $2, salary = $3 WHERE id = $4 RETURNING *",
      [name, division, salary, id]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Function to delete an existing employee
exports.deleteEmployee = async function deleteEmployee(req, res) {
  try {
    const { id } = req.body;
    const response = await pg.query(
      "DELETE FROM employee WHERE id = $1 RETURNING *",
      [id]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
