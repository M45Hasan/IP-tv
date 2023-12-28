const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    serviceId: String,
    trnasId: String,
    price: Number,
   
    isSuccess: { type: Boolean, default: false },
    service: [
      {
        type: Object,
      },
    ],
    customerInfo: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", newSchema);
