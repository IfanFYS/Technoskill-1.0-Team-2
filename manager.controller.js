const pg = require("../utils/connect");

exports.register = async function register(req, res) {
  // Insert kode REGISTER di sini
  try {
    const { name, password } = req.body;
    const response = await.pq.query (
      "INSERT INTO manager (name, password) VALUES ($1, $2) RETURNING *",
      [name, password]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.login = async function login(req, res) {
  // Insert kode LOGIN di sini
  try {
    const { name, password } = req.body;
    const response = await pg.query(
      "SELECT * FROM manager WHERE name = $1 AND password = $2",
      [name, password]
    );
    if (response.rows.length === 0) throw new Error("Failed to login");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
