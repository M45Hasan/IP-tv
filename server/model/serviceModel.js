const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    purchaseList: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    serviceName: { type: String, require },
    categoryName: { type: String, require },
    detail: { type: String },
    information: { type: String },
    live: { type: String },
    movie: { type: String },
    series: { type: String },
    url: { type: String },
    demo: { type: Boolean, default: true },
    reseller: { type: Boolean, default: true },
    resellerInfo: {
      type: String,
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
    saleCount: { type: Number, default: 0 },
    isHide: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("Service", serviceSchema);

// serviceName:
// detail: ,
// information: ,
// live: ,
// movie: ,
// series: ,
// url: ,

// resellerInfo: {
//   serviceInfo:
// },

// restreamInfo: {
//   wwConnection:
//   serviceInfo:
// },

// price: {
//   subcriptionPrice: {  { 3,6,12 , 5,10,50,100}
//     threeMonths:
//     sixMonths:
//     twelevMonths:
//   },
//   resellerPriceMonthly: {
//     fiveCredits: ,
//     tenCredits:,
//   },
//   restreamPriceMonthly: {
//     fiftyK:
//     hundedK:
//   },
//   regularPrice:
// },
