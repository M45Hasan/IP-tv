const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");
const { ObjectId } = require("mongodb");
const axios = require("axios");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../errors/customError");

const Customer = require("../../model/customerModel");
const Order = require("../../model/orderModel");
const Service = require("../../model/serviceModel");
const tran_id = new ObjectId().toString();
const payUrl = process.env.payUrl;
const payKey = process.env.payKey;
const cUrl = process.env.CLIENT_URL;
const bUrl = process.env.SERVER_URL;
const baseUrl = process.env.BASE_URL;
const apiUrl = process.env.BASE_URL;
const sdk = require("api")("@uddoktapay/v1.0#18jb7p449loilgy1v");
const { sendOrderConfirmationEmail } = require("../../utils/orderMail");

const reqOrder = tryCatch(async (req, res, next) => {
  const { cid, sId, price, serviceName, serviceInfo } = req.body;
  console.log(cid, sId, price, serviceName, serviceInfo);
  const customer = await Customer.findOne({ _id: cid });

  const service = await Service.findOne({ _id: sId });
  if (!service) {
    return next(new NotFoundError("No"));
  }

  const options = {
    method: "POST",
    url: `${payUrl}/api/checkout-v2`,
    headers: {
      accept: "application/json",
      "RT-UDDOKTAPAY-API-KEY": `${payKey}`,
      "content-type": "application/json",
    },
    data: {
      full_name: customer.name,
      email: customer.email,
      amount: price,
      metadata: { sId: service._id, tId: tran_id, info: serviceInfo },
      redirect_url: `${bUrl}${baseUrl}/order/success/${tran_id}`,
      cancel_url: `${bUrl}${baseUrl}/order/cancel/${tran_id}`,
      webhook_url: `${bUrl}${baseUrl}/order/ipn/${tran_id}`,
    },
  };

  axios
    .request(options)
    .then(async function (response) {
      console.log("ami options:", response.data.status);
      if (response.data.status === true) {
        const newOrder = new Order({
          customer: customer._id,
          serviceId: service._id,
          sId: sId,
          tId: tran_id,
          price: price,
          serviceName: serviceName,
          serviceInfo: serviceInfo,

          //   isSuccess: { type: Boolean, default: false },
          //   serviceStart: Date,
          //   serviceEnd: Date,
          service: service,
          customerInfo: customer,
        });

        const saveOrder = await newOrder.save();
        console.log("saveOrder:", saveOrder);
        return res.send(response.data.payment_url);
      }
    })
    .catch(function (error) {
      return res.status(400).json({ error: error });
    });
});

const orderSuccess = tryCatch(async (req, res, next) => {
  const tId = req.params.tran_id;
  const ifService = await Order.findOne({ tId: tId });

  if (!ifService) {
    return res.redirect(`${cUrl}/fail`);
  }

  let addMonth = 0;

  if (ifService.serviceInfo === 3) {
    addMonth = 3;
  } else if (ifService.serviceInfo === 6) {
    addMonth = 6;
  } else if (ifService.serviceInfo === 12) {
    addMonth = 12;
  } else if ([5, 10, 50, 100].includes(ifService.serviceInfo)) {
    addMonth = 1;
  }
  // month adding #####
  const currentDate = new Date();
  const newDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + addMonth)
  );
  // month adding #####
  const updateOrder = await Order.findByIdAndUpdate(
    { _id: ifService._id },
    {
      $set: {
        isSuccess: true,
        serviceStart: Date.now(),
        serviceEnd: newDate,
      },
    },
    { new: true }
  );

  await Customer.findByIdAndUpdate(
    { _id: ifService.customer },
    {
      $push: {
        orderList: updateOrder._id,
      },
    },
    { new: true }
  );
  await Service.findByIdAndUpdate(
    { _id: ifService.serviceId },
    {
      $inc: {
        saleCount: 1,
      },
      $push: {
        purchaseList: updateOrder._id,
      },
    },
    { new: true }
  );

  console.log(updateOrder);
  sendOrderConfirmationEmail(updateOrder.customerInfo.email, updateOrder);
  return res.redirect(`${cUrl}/success/${tId}`);
});

const orderCancel = tryCatch(async (req, res, next) => {
  const tId = req.params.tran_id;
  const ifService = await Order.findOneAndDelete({ tId: tId });
  return res.redirect(`${cUrl}/fail`);
});

const allOrder = tryCatch(async (req, res, next) => {
  const successOrder = await Order.find({ isSuccess: true });
  const cancelOrder = await Order.find({ isSuccess: false });

  return res.status(200).json({
    success: successOrder.length > 0 ? successOrder : 0,
    cancel: cancelOrder.length > 0 ? cancelOrder : 0,
  });
});

const delOrder = tryCatch(async (req, res, next) => {
  const id = req.params.uid;
  const xOrder = await Order.findByIdAndDelete(id);
  if (!xOrder) {
    return next(new BadRequestError("Failed"));
  }
  appStatus(200, "Delete", "", res);
});
module.exports = {
  reqOrder,
  orderSuccess,
  orderCancel,
  allOrder,
  delOrder,
};
