import { pool } from './pool';

const createTable = `
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT
);
`

export const initDb = async () => {
  await pool.query(createTable);
}