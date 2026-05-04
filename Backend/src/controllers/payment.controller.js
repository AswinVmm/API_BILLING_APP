// Razorpay example
const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.KEY,
    key_secret: process.env.SECRET
});