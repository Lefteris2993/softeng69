const router = require('express').Router();
const stripe = require("stripe")("sk_test_51I6jr5GG9cBCL6SRRIRD9MEMB5mlMdohVAMDuUSvniJOkywegsJuZ8YyEse29FFlyWmmQJAgvzxUbB6PQJ6Wrbwn001dqwHApp");
const uuid = require("uuid").v4;
const { client } = require('../dbconfig')
router.route("/").post(async (req, res) => {
    console.log("Request:", req.body);
  
    let error;
    let status;
    try {
      const { product, token } = req.body;
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.name}`
        },
        {
          idempotency_key
        }
      );
      console.log("Charge:", { charge });
      status = "success";
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
  });

  module.exports = router;