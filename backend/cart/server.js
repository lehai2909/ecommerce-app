import express from 'express';
import serverless from 'serverless-http';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const app = express();
app.use(express.json());

const client = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-west-1' });
const ddbDocClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.CART_TABLE_NAME || 'ecommerce-cart';

app.get('/api/cart', async (req, res) => {
  const email = req.query.email || 'guest';
  try {
    const { Item } = await ddbDocClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { email }
    }));
    if (Item && Item.cart) {
      res.json(Item.cart);
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
  console.log(`Saving cart for ${email}:`, JSON.stringify(cart));
  if (!cart) {
    return res.status(400).json({ error: 'Cart data is required' });
  }
  
  try {
    await ddbDocClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        email,
        cart
      }
    }));
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ error: 'Failed to save cart' });
  }
});

app.get('/health', (req, res) => res.json({ status: "ok" }));

export const handler = serverless(app);
