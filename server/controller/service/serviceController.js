const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");

const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../errors/customError");
const lib = require("../../utils/staticFile");
const Customer = require("../../model/customerModel");
const Order = require("../../model/orderModel");
const Category = require("../../model/categoryModel");
const Service = require("../../model/serviceModel");

const newService = tryCatch(async (req, res, next) => {
  const {
    serviceName,
    detail,
    information,
    live,
    movie,
    series,
    resellerInfo,
    wwConnection,
    serviceInfo,
    threeMonths,
    sixMonths,
    twelevMonths,
    fiveCredits,
    tenCredits,
    fiftyK,
    hundedK,
    regularPrice,
  } = req.body;

  const id = req.params.uid;
  const ifThere = await Category.findOne({ name: id });

  if (!ifThere) {
    return next(new NotFoundError("No category"));
  }

  const crtService = new Service({
    serviceName,
    detail,
    information,
    live,
    movie,
    series,
    url: req.file ? req.filename : null,
    resellerInfo,
    restreamInfo: {
      wwConnection,
      serviceInfo,
    },
    price: {
      subcriptionPrice: {
        threeMonths,
        sixMonths,
        twelevMonths,
      },
      resellerPriceMonthly: {
        fiveCredits,
        tenCredits,
      },
      restreamPriceMonthly: {
        fiftyK,
        hundedK,
      },
      regularPrice,
    },
    category: ifThere._id,
  });

  const saveService = await crtService.save();

  if (!saveService) {
    return next(new InvalidEntry("Service Not Created"));
  }

  const thisCat = await Category.findByIdAndUpdate(
    { _id: ifThere._id },
    { $push: { serviceList: saveService._id } },
    { new: true }
  );

  appStatus(201, "Service", saveService, res);
});

const allService = tryCatch(async (req, res, next) => {
  const viewAll = await Service.find();
  appStatus(200, `${viewAll.length > 0 ? "Service" : "No"}`, viewAll, res);
});
const singleService = tryCatch(async (req, res, next) => {
  const id = req.params.uid;
  const single = await Service.findById(id);
  appStatus(200, "Send", single, res);
});
const delService = tryCatch(async (req, res, next) => {
  const id = req.params.uid;
  const single = await Service.findByIdAndDelete(id);
  if (!single) {
    return next(new BadRequestError("Service Not Deleted"));
  }
  lib.delete(single.url);
  appStatus(200, "Delete", "", res);
});

const updateService = tryCatch(async (req, res, next) => {
  const id = req.params.uid;
  const updateFields = req.body;

  const ifMatch = await Service.findById(id);
  if (!ifMatch) {
    return next(new BadRequestError("Invalid service ID"));
  }

  const updatedService = await Service.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedService) {
    return next(new NotFoundError("Service not found"));
  }

  appStatus(200, "Service Updated", updatedService, res);
});
module.exports = {
  newService,
  allService,
  singleService,
  delService,
  updateService,
};
