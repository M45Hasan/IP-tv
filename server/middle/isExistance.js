const { tryCatch } = require("../utils/tryCatch");
const appStatus = require("../utils/appStatus");
const User = require("../model/userModal");
const verifymail = require("../utils/mailing");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../errors/customError");

const Customer = require("../model/customerModel");

const check = tryCatch(async (req, res, next) => {
  const email = req.body.email;
  const isThere = await Customer.findOne({ email: email, isEamilVerify: true });
  if (isThere) {
    return res.redirect(`${process.env.CLIENT_URL}/paymentOption`);
  }
  const isTher = await Customer.findOne({ email: email, isEamilVerify: false });
  if (isTher) {
    const newOtp = Math.floor(1000 + Math.random() * 900).toString();
    const otpSend = await Customer.findByIdAndUpdate(
      { _id: isTher._id },
      { $set: { otp: newOtp } },
      { new: true }
    );

    const link = `${process.env.SERVER_URL}${process.env.BASE_URL}/customer/verify/${newOtp}?email=${email}`;
    verifymail(isTher.email, "Verify your email", link);
    return res.status(200).json({ message: "Kindly Check your email" });
  }
  next();
});

module.exports = check;
