// This is your test secret API key.
import Stripe from "stripe";
import express from "express";

const stripe = new Stripe(
  "sk_test_51SvZFnE2e9uzluggOeiUDpCopJm2bdiKu0kBVR0lBoermJu1ITm50ZkGwQketwICA7dSwYl2LANkczCOytIe5j7M00VeXdOo5L",
);
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: "price_1SvvQtE2e9uzluggZ6SqhgZQ",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
