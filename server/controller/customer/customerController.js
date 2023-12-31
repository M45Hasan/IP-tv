const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");

const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../errors/customError");

const Customer = require("../../model/customerModel");
const Order = require("../../model/orderModel");
const Service = require("../../model/serviceModel");
const verifymail = require("../../utils/mailing");

const newCustomer = tryCatch(async (req, res, next) => {
  const { name, email, mobile, address } = req.body;

  if (!email) {
    return next(new BadRequestError("Email Require"));
  }
  const newOtp = Math.floor(1000 + Math.random() * 900).toString();
  const newCustomer = new Customer({
    email,
    name,
    mobile,
    address,
    otp: newOtp,
  });

  const saveCustomer = await newCustomer.save();
  if (!saveCustomer) {
    return next(new BadRequestError("Something wrong"));
  }
  const link = `${process.env.SERVER_URL}${process.env.BASE_URL}/customer/verify/${newOtp}?email=${email}`;
  verifymail(saveCustomer.email, "Verify your email", link);
  appStatus(201, "Customer", saveCustomer, res);
});

const emailVerify = tryCatch(async (req, res, next) => {
  const otp = req.params.otp;
  const email = req.query.email;

  const ifMatch = await Customer.findOneAndUpdate(
    { email, otp },
    { $set: { otp: 0, isEamilVerify: true } },
    { new: true }
  );

  if (!ifMatch) {
    return next(new InvalidEntry("NO Match"));
  }
  res.redirect(`${process.env.CLIENT_URL}/paymentOption`);
});

const getAll = tryCatch(async (req, res, next) => {
  const view = await Customer.find();
  const viewDetail = await Customer.find()
    .populate("orderView")
    .populate("myService");

  return res.status(200).json({ data: view, dataDetail: viewDetail });
});

const getMe = tryCatch(async (req, res, next) => {
  const id = req.params.uid;

  const myInfo = await Customer.findById(id)
    .populate("orderView")
    .populate("myService");
  appStatus(200, "INfo", myInfo, res);
});
module.exports = {
  newCustomer,
  emailVerify,
  getMe,
  getAll,
};
