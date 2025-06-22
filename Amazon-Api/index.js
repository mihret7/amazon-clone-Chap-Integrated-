const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const chapaKey = process.env.CHAPA_KEY;
// using chapa payment
const Chapa = require("chapa");
let myChapa = new Chapa(chapaKey)


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});


app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  const {
    email,
    first_name,
    last_name,
  } = req.body;
 

  if (total > 0) {
    const customerInfo = {
      amount: total.toString(),
      currency: "ETB",
      email: email,
      first_name: first_name,
      last_name: last_name,
      // return_url: "https://amazon-clone-chapa.netlify.app/orders-success",
    };
console.log(customerInfo);
    try {
      const response = await myChapa.initialize(customerInfo, { autoRef: true });
      res.status(201).json({
        message: "Payment intent created successfully",
        checkout_url: response.data?.checkout_url,
        tx_ref: response.tx_ref,
      });
    } catch (error) {
      res.status(500).json({ message: "Payment initialization failed", error });
    }
  } else {
    res.status(400).json({
      message: "Payment amount must be greater than 0",
    });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


