import pool from '../utils/connect.js';

// Registration Function
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const response = await pool.query(
      `INSERT INTO managers (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [name, email, password]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.query; // Extract data from query parameters

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Query the database for the user with the provided email
    const response = await pool.query(
      "SELECT * FROM managers WHERE email = $1",
      [email]
    );

    // Check if a user was found with the given email
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const manager = response.rows[0];

    // Directly compare the provided password with the stored password
    if (password !== manager.password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Exclude the password from the response for security reasons
    const { password: _, ...userWithoutPassword } = manager;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update Manager Function
export const updateManager = async (req, res) => {
  try {
    const { id, oldEmail, oldPassword, newEmail, newPassword, newProfileImageUrl } = req.body;

    if (!id || !oldEmail || !oldPassword) {
      return res.status(400).json({ error: 'ID, old email, and old password are required' });
    }

    const userResponse = await pool.query(
      "SELECT password FROM managers WHERE email = $1 AND id = $2",
      [oldEmail, id]
    );

    if (userResponse.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const storedPassword = userResponse.rows[0].password;

    if (oldPassword !== storedPassword) {
      return res.status(401).json({ error: 'Incorrect old password' });
    }

    let updateFields = [];
    let values = [];
    let queryIndex = 1;

    if (newEmail && newEmail !== oldEmail) {
      updateFields.push(`email = $${queryIndex}`);
      values.push(newEmail);
      queryIndex++;
    }

    if (newPassword) {
      updateFields.push(`password = $${queryIndex}`);
      values.push(newPassword);
      queryIndex++;
    }

    if (newProfileImageUrl) {
      updateFields.push(`profile_image_url = $${queryIndex}`);
      values.push(newProfileImageUrl);
      queryIndex++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const updateQuery = `UPDATE managers SET ${updateFields.join(', ')} WHERE id = $${queryIndex} RETURNING *`;

    const response = await pool.query(updateQuery, values);

    if (response.rows.length === 0) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error('Error updating manager:', error);
    res.status(500).json({ error: error.message });
  }
};
