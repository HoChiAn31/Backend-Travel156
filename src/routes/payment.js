const express = require("express");
const router = express.Router();
const Payment = require("../controllers/payment");

router.post("/payment_zaloPay", Payment.createPaymentZaloPay);
router.get("/get_paymentUrl", Payment.getPaymentUrl);
router.post("/callback_Zalopay", Payment.callBackPaymentZaloPay);
router.post("/check-status-order-zaloPay", Payment.checkStatusPaymentZaloPay);

module.exports = router;
