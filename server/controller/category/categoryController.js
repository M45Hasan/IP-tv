const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");
const User = require("../../model/userModal");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../errors/customError");
const Service = require("../../model/serviceModel");
const Category = require("../../model/categoryModel");

const newCategory = tryCatch(async (req, res, next) => {
  const nam = req.body.name;

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
  const id = req.params.id;
  console.log(id);
  const delCat = await Category.findByIdAndDelete({ _id: id });
  if (!delCat) {
    return next(new BadRequestError("Delete failed"));
  }
  appStatus(200, "Delete", "", res);
});
module.exports = {
  newCategory,
  delCategory,
};
