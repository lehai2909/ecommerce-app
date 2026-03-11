import express from 'express';
import { createClient } from 'redis';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());

// Note: In k8s, this container runs in the same pod as the 'redis' container
// so they share 'localhost' (127.0.0.1) network.
const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || '6379';

const client = createClient({
  url: `redis://${redisHost}:${redisPort}`
});

client.on('error', err => console.error('Redis Client Error', err));

async function initRedis() {
  try {
    await client.connect();
    console.log('Connected to Redis at ' + redisHost + ':' + redisPort);
  } catch (err) {
    console.error('Failed to connect to Redis', err);
    process.exit(1);
  }
}

// Routes
// We make a simple save/get API instead of full CRUD for items, 
// matching how the frontend originally saved state to localStorage.

app.get('/api/cart', async (req, res) => {
  const email = req.query.email || 'guest';
  try {
    const data = await client.get(`cart:${email}`);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      res.json({ items: [], totalAmount: 0 });
    }
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart', async (req, res) => {
  const { email = 'guest', cart } = req.body;
  if (!cart) {
    return res.status(400).json({ error: 'Cart data is required' });
  }
  
  try {
    await client.set(`cart:${email}`, JSON.stringify(cart));
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

app.get('/health', (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Cart service running on port ${port}`);
  initRedis();
});
