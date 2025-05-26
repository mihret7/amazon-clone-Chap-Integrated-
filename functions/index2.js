const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");


const stripeKey = process.env.STRIPE_KEY;
const chapaKey = process.env.CHAPA_KEY;

// using stripe payment
const stripe = require("stripe")(stripeKey);

// using chapa payment
// const Chapa = require("chapa");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});


app.post("/payment/create", async (req, res)=>{
  const total = req.query.total;

  if(total > 0){
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
      message: "Payment intent created successfully",
    });
  }
  else {
    res.status(403).json({
      message: "Payment amount must be greater than 0",
    });
}
})




exports.api = onRequest(app);
