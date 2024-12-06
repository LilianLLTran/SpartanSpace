const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
/* eslint-disable-next-line max-len */
const stripe = require("stripe")("sk_test_51QN1m6Dy1t2pszvKwW8khsLAOO9egBHOpnya6DxUtLQjce0vlD61hUo5IEfneafP0enz3e7QjNLCFk57faxJKAxJ00k5aqYrmN");
// Use secure config

// - App config
const app = express();

// Middleware
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Reuqest Received BOOM!! for this amount", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // Ok - craeted
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen Command
exports.api = functions.https.onRequest(app);

// Example endpoint URL:
// http://127.0.0.1:5001/spartan-space/us-central1/api
