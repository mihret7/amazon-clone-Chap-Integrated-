
const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const stripeKey = process.env.STRIPE_KEY;

// using stripe payment
const stripe = require("stripe")(stripeKey);


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});


app.post("/payment/create", async (req, res)=>{
  const total = parseInt(req.query.total);
  console.log(total)

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



let port = 3001
app.listen(port, (error)=>{
    if(error) {console.log("Error starting amazon server", error);}
    else {console.log(`Amazon server is running on port: ${port}, http://localhost:${port}`);}
})
