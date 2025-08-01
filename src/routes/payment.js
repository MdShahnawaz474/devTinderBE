const express = require("express");
const { userAuth } = require("../middleware/auth.js");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay.js");
const Payment = require("../models/paymentModel.js");
const { membershipAmounts } = require("../utils/constants.js");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils.js");
const User = require("../models/user.js");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  const receiptId = `DevTinder_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const { membershipTypes } = req.body;
  const { firstName, lastName, emailId } = req.user;
  try {
    if (!membershipTypes) {
      return res.status(400).json({
        success: false,
        message: "Membership type is required",
      });
    }

    if (!membershipAmounts[membershipTypes]) {
      return res.status(400).json({
        success: false,
        message: `Invalid membership type: ${membershipTypes}. Available types: ${Object.keys(
          membershipAmounts
        ).join(", ")}`,
      });
    }
    const amount = membershipAmounts[membershipTypes];

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount for the selected membership type",
      });
    }

    console.log(`Creating order for ${membershipTypes} with amount: ${amount}`);

    const order = await razorpayInstance.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receiptId,
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipTypes,
        timestamp: new Date().toISOString(),
      },
    });

    const notesObj = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      timestamp: new Date().toISOString(),
      membershipType: membershipTypes,
    };
    console.log(order);

    const payment = new Payment({
      userId: req.user._id,
      paymentId: null, // This will be set after payment confirmation
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: notesObj,
    });

    const savedPayment = await payment.save();
    console.log(savedPayment);

    // Optionally, you can return the saved payment details
    // res.status(201).json({
    //     success: true,
    //     message: "Payment order created successfully",
    //     order: {
    //         id: order.id,
    //         amount: order.amount,
    //         currency: order.currency,
    //         receipt: order.receipt,
    //         status: order.status,
    //         created_at: order.created_at
    //     },
    //     paymentId: savedPayment._id // Return the saved payment ID
    // });

    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
    //     res.status(201).json({
    //     success: true,
    //     message: "Payment order created successfully",
    //     order: {
    //         id: order.id,
    //         amount: order.amount,
    //         currency: order.currency,
    //         receipt: order.receipt,
    //         status: order.status,
    //         created_at: order.created_at
    //     }
    // });
  } catch (error) {
    console.error("Payment creation error:", error);

    // Handle specific Razorpay errors
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: "Razorpay error",
        error: error.error?.description || error.message,
      });
    }

    // Handle general errors
    res.status(500).json({
      success: false,
      message: "Internal server error while creating payment order",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("Webhook Called");
    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("INvalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    console.log("Valid Webhook Signature");

    // Udpate my payment Status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
    console.log("Payment saved");

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    console.log("User saved");

    await user.save();

    // Update the user as premium

    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }

    // return success response to razorpay

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  console.log(user);
  if (user.isPremium) {
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentRouter;
