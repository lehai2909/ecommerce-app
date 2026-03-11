import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());

// Database configuration
// Note: In k8s, this container runs in the same pod as the 'mysql' container
// so they share 'localhost' (127.0.0.1) network.
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secretpassword',
  database: process.env.DB_NAME || 'products',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

const productsData = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life",
    category: "Electronics",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 2,
    name: "Smartphone Pro Max",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    description: "Latest flagship smartphone with 256GB storage, triple camera system, and 5G connectivity",
    category: "Electronics",
    rating: 4.8,
    stock: 8,
  },
  {
    id: 3,
    name: 'Laptop Ultra 15"',
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    description: "High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD, and dedicated graphics",
    category: "Computers",
    rating: 4.7,
    stock: 12,
  }
];

// Initialize database
async function initDb() {
  try {
    // Wait a bit for MySQL to start
    console.log("Waiting for MySQL to be ready...");
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // First connect without database selected to create it if it doesn't exist
    const setupConnection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });
    
    await setupConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    await setupConnection.end();

    pool = mysql.createPool(dbConfig);
    console.log('Connected to MySQL database');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(512),
        description TEXT,
        category VARCHAR(100),
        rating DECIMAL(3, 1),
        stock INT
      )
    `;
    await pool.query(createTableQuery);
    console.log('Products table ensured');

    // Check if empty, then seed
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('Seeding initial products data...');
      for (const p of productsData) {
        await pool.query(
          'INSERT INTO products (id, name, price, image, description, category, rating, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [p.id, p.name, p.price, p.image, p.description, p.category, p.rating, p.stock]
        );
      }
      console.log('Products seeded successfully');
    }
  } catch (err) {
    console.error('Failed to initialize database:', err);
    // Exit if we can't connect, let k8s restart the pod
    process.exit(1); 
  }
}

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    // Convert decimal columns from string to numbers for consistent JSON
    const products = rows.map(p => ({
      ...p,
      price: parseFloat(p.price),
      rating: parseFloat(p.rating)
    }));
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const p = rows[0];
    res.json({
        ...p,
        price: parseFloat(p.price),
        rating: parseFloat(p.rating)
    });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Product Catalog service running on port ${port}`);
  initDb();
});
