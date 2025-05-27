const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
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
      return_url: 'http://localhost:5173/orders-success',
    };

    try {
      const response = await myChapa.initialize(customerInfo, { autoRef: true });
      console.log(response);
      res.status(201).json({
        message: "Payment intent created successfully",
        checkout_url: response.data?.checkout_url,
        tx_ref: response.tx_ref,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Payment initialization failed", error });
    }
  } else {
    res.status(400).json({
      message: "Payment amount must be greater than 0",
    });
  }
});




// // POST /api/verify
// app.post('/verify', async (req, res) => {
//   const { tx_ref } = req.body;

//   if (!tx_ref) {
//     return res.status(400).json({ error: 'Transaction reference is required.' });
//   }

//   try {
//     myChapa
//       .verify(tx_ref)
//       .then((d) => console.log(d))
//       .catch((e) => console.log(e));
//   } catch (error) {
//     return res.status(500).json({
//       error: 'Server error during verification.',
//       details: error.response?.data || error.message,
//     });
//   }
// });



exports.api = onRequest(app);
