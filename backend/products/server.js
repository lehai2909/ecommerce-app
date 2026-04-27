import express from 'express';
import serverless from 'serverless-http';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const app = express();
app.use(express.json());

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-west-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.PRODUCTS_TABLE_NAME || 'ecommerce-products';

const productsData = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 79.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", description: "Premium noise-cancelling wireless headphones with 30-hour battery life", category: "Electronics", rating: 4.5, stock: 15 },
  { id: 2, name: "Smartphone Pro Max", price: 999.99, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop", description: "Latest flagship smartphone with 256GB storage, triple camera system, and 5G connectivity", category: "Electronics", rating: 4.8, stock: 8 },
  { id: 3, name: 'Laptop Ultra 15"', price: 1299.99, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop", description: "High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD, and dedicated graphics", category: "Computers", rating: 4.7, stock: 12 }
];

async function seedProducts() {
  console.log("Seeding products...");
  for (const product of productsData) {
    await ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: product
    }));
  }
}

app.get('/api/products', async (req, res) => {
  try {
    let { Items } = await ddbDocClient.send(new ScanCommand({
      TableName: TABLE_NAME
    }));
    
    if (!Items || Items.length === 0) {
      await seedProducts();
      const result = await ddbDocClient.send(new ScanCommand({ TableName: TABLE_NAME }));
      Items = result.Items;
    }
    
    res.json(Items || []);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { Item } = await ddbDocClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: parseInt(req.params.id, 10) }
    }));
    if (!Item) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(Item);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.get('/health', (req, res) => res.json({ status: "ok" }));

export const handler = serverless(app);
