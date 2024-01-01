const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");

const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../errors/customError");
const Service = require("../../model/serviceModel");
const Category = require("../../model/categoryModel");

const newCategory = tryCatch(async (req, res, next) => {
  const nam = req.body.name;
  console.log(nam);
  const cat = await Category.findOne({ name: nam });
  if (cat) {
    return next(new BadRequestError("Already there"));
  }
  const crtCat = new Category({
    name: nam,
  });
  const saveCat = await crtCat.save();

  if (!saveCat) {
    return next(new InvalidEntry("Problem"));
  }
  appStatus(201, "Category", saveCat, res);
});

const delCategory = tryCatch(async (req, res, next) => {
  const id = req.params.uid;
  console.log(id);
  const delCat = await Category.findByIdAndDelete({ _id: id });
  if (!delCat) {
    return next(new BadRequestError("Delete failed"));
  }

  if (delCat.serviceList.length > 0) {
    await Service.deleteMany({ _id: { $in: delCat.serviceList } });
  }
  appStatus(200, "Delete", "", res);
});

const getCategory = tryCatch(async (req, res, next) => {
  const view = await Category.find();
  const viewDetail = await Category.find().populate("serviceView");

  return res.status(200).json({ data: view, dataDetail: viewDetail });
});

const oneCategory = tryCatch(async (req, res, next) => {
  const id = req.params.uid;
  const viewOne = await Category.findOne({ name: id }).populate("serviceView");

  appStatus(200, "Done", viewOne, res);
});
module.exports = {
  newCategory,
  delCategory,
  getCategory,
  oneCategory,
};
