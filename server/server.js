import express from 'express';
import { createPool } from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test database connection
app.get('/api/test-connection', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ message: 'Database connection successful!', data: rows });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Create table if not exists
const createTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Table created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// CRUD Routes
// Create
app.post('/api/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Error creating item' });
  }
});

// Read all
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Error fetching items' });
  }
});

// Read single
app.get('/api/items/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Error fetching item' });
  }
});

// Update
app.put('/api/items/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await db.query(
      'UPDATE items SET name = ?, description = ? WHERE id = ?',
      [name, description, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ id: req.params.id, name, description });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Error updating item' });
  }
});

// Delete
app.delete('/api/items/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item' });
  }
});

// Initialize database and start server
const startServer = async () => {
  try {
    await createTable();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
