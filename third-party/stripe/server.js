import Stripe from "stripe";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const stripe = new Stripe(
  "sk_test_51SvZFnE2e9uzluggOeiUDpCopJm2bdiKu0kBVR0lBoermJu1ITm50ZkGwQketwICA7dSwYl2LANkczCOytIe5j7M00VeXdOo5L",
);
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/checkout/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const YOUR_DOMAIN = process.env.FRONTEND_URL || req.headers.origin || "http://localhost:5173";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/checkout?success=true`,
      cancel_url: `${YOUR_DOMAIN}/cart?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

export const handler = serverless(app);
