const { tryCatch } = require("../../utils/tryCatch");
const appStatus = require("../../utils/appStatus");
const User = require("../../model/userModal");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../errors/customError");
const registration = tryCatch(async (req, res, next) => {
  // const { firstName, lastName, email, mobile } = req.body;
  const data = req.body;
  const ifExist = await User.findOne({ email: data.email });
  if (ifExist) {
    return next(new BadRequestError("User already existed"));
  }
  // if (!data.firstName || !data.lastName || !data.email || !data.mobile) {
  //   return next(new BadRequestError("Missing required fields"));
  // }
  const createEmp = new User(data);
  const saveUser = await createEmp.save();
  if (!saveUser) {
    return next(new InvalidEntry("NO "));
  }
  appStatus(200, "Created", saveUser, res);
});

module.exports = registration;
