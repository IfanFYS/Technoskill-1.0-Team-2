import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  ssl: {
    require: true,
  },
});

pool.connect().then(() => {
  console.log('Connected to Neon database!');
}).catch((err) => {
  console.error('Error connecting to Neon database:', err);
});

export default pool;
