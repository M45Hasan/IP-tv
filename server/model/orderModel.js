const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
    sId: String,
    tId: String,
    price: Number,
    serviceName: String,
    serviceInfo: Number,
    isSuccess: { type: Boolean, default: false },
    serviceStart: Date,
    serviceEnd: Date,
    service: {
      type: Object,
    },

    customerInfo: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", newSchema);
