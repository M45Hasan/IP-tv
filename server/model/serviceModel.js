const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    serviceName: { type: String, require },
    detail: { type: String },
    information: { type: String },
    live: { type: String },
    movie: { type: String },
    series: { type: String },
    url: { type: String },
    demo: { type: Boolean, default: true },
    reseller: { type: Boolean, default: true },
    resellerInfo: {
      serviceInfo: String,
    },
    restream: { type: Boolean, default: true },
    restreamInfo: {
      wwConnection: String,
      serviceInfo: String,
    },
    subScription: { type: Boolean, default: true },
    price: {
      subcriptionPrice: {
        threeMonths: Number,
        sixMonths: Number,
        twelevMonths: Number,
      },
      resellerPriceMonthly: {
        fiveCredits: Number,
        tenCredits: Number,
      },
      restreamPriceMonthly: {
        fiftyK: Number,
        hundedK: Number,
      },
      regularPrice: Number,
    },
    saleCount: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);
