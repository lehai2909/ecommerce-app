// This is your test secret API key.
import Stripe from "stripe";
import express from "express";
import cors from "cors";

//No worry, this is sandbox Stripe key
const stripe = new Stripe(
  "sk_test_51SvZFnE2e9uzluggOeiUDpCopJm2bdiKu0kBVR0lBoermJu1ITm50ZkGwQketwICA7dSwYl2LANkczCOytIe5j7M00VeXdOo5L",
);
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/api/checkout/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    // Instead of full products, Stripe expects a price_data object
    const line_items = items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // convert dollars to cents
        },
        quantity: item.quantity,
      };
    });

    const YOUR_DOMAIN = req.headers.origin || "http://localhost:5173";
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

app.listen(4242, () => console.log("Running on port 4242"));
