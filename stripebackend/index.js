const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51HA9rDC8y1PxQqoInq0VzqidM71y0SmkBKIWJ0eNTsIumfkvqamxk91nbrVv9hGO9cfd3RooDkMGSnO9lYHxGeQ800vl2AMrto")
// Add stripe key
const uuid = require("uuid");
const env = require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("It works");
    
})

app.post("/payment", (req, res) => {
    res.send("Payment page");
    const {product, token} = req.body;
    console.log("PRODUCT ", product);
    console.log("PRICE ", product.price);
    const idempontencyKey = uuid();
    

    return stripe.customers.create({
        email: token.email,
        source: token.id

    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            reciept_email: token.email,
            description: 'product.name'
        }, {idempontencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
 })

app.listen(3000, () => {
    console.log("3001 running");
})