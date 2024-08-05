import { useParams } from 'react-router-dom';
import pool from '../utils/connect.js';

// Function to add a new employee
export const addEmployee = async (req, res) => {
  try {
    const { name, division, salary } = req.body;
    const response = await pool.query(
      "INSERT INTO employee (name, division, salary, profile_image_url, date_joined) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, division, salary, null, null]
    );

    res.status(201).json(response.rows[0]); // Returns HTTP status code 201.
  } catch (error) {
    res.status(500).json({ error: error.message }); // Returns HTTP status code 500 if an error is encountered.
  }
};

// Function to get all employees
export const getAllEmployee = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to search employees by name
export const getEmployeesByName = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await pool.query(
      "SELECT * FROM employee WHERE name = $1",
      [name]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to search employees by division
export const getEmployeesByDivision = async (req, res) => {
  try {
    const { division } = req.body;
    const response = await pool.query(
      "SELECT * FROM employee WHERE division = $1",
      [division]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Division not found or empty" });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to search employees by salary range
export const getEmployeesSalaryBetween = async (req, res) => {
  try {
    const { min, max } = req.body;
    const response = await pool.query(
      "SELECT * FROM employee WHERE salary >= $1 AND salary <= $2",
      [min, max]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "No employees in the salary range" });
    } else {
      res.status(200).json(response.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to search an employee by ID
export const getOneEmployeeByID = async (req, res) => {
  try {
    const { id } = req.params; // Accessing params from req.params
    const response = await pool.query(
      "SELECT * FROM employee WHERE id = $1",
      [id]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to edit an existing employee
export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { name, division, salary, profile_image_url } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: "Employee ID is required" });
    }

    // Prepare the update fields and values dynamically
    let updateFields = [];
    let values = [];
    let queryIndex = 1;

    if (name) {
      updateFields.push(`name = $${queryIndex}`);
      values.push(name);
      queryIndex++;
    }

    if (division) {
      updateFields.push(`division = $${queryIndex}`);
      values.push(division);
      queryIndex++;
    }

    if (salary) {
      updateFields.push(`salary = $${queryIndex}`);
      values.push(salary);
      queryIndex++;
    }

    if (profile_image_url) {
      updateFields.push(`profile_image_url = $${queryIndex}`);
      values.push(profile_image_url);
      queryIndex++;
    }

    // Ensure at least one field is being updated
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Append the ID for the WHERE clause
    values.push(id);

    const updateQuery = `UPDATE employee SET ${updateFields.join(', ')} WHERE id = $${queryIndex} RETURNING *`;
    
    const response = await pool.query(updateQuery, values);

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json(response.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to delete an existing employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await pool.query(
      "DELETE FROM employee WHERE id = $1 RETURNING *",
      [id]
    );

    if (response.rows.length === 0) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ message: "Employee deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
