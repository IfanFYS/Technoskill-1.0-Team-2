import pool from '../utils/connect.js';

export const register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const response = await pool.query(
      "INSERT INTO manager (name, password) VALUES ($1, $2) RETURNING *",
      [name, password]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const response = await pool.query(
      "SELECT * FROM manager WHERE name = $1 AND password = $2",
      [name, password]
    );

    if (response.rows.length === 0) throw new Error("Failed to login");

    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
