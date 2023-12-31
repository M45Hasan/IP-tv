const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, require },
    isEamilVerify: { type: Boolean, default: false },
    role: { type: String, default: "client" },
    mobile: { type: String },
    addres: { type: String },
    otp: Number,
    orderList: [{ type: Schema.Types.ObjectId, ref: "Order", virtual: true }],
    purchaseService: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      virtual: true,
    },
  },
  {
    timestamps: true,
  }
);
newSchema.virtual("orderView", {
  ref: "Order",
  localField: "orderList",
  foreignField: "_id",
});
newSchema.virtual("myService", {
  ref: "Service",
  localField: "purchaseService",
  foreignField: "_id",
});

newSchema.set("toObject", { virtuals: true });
newSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Customer", newSchema);
