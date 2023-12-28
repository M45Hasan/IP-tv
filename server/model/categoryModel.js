const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, unique: true },
    serviceList: [
      { type: Schema.Types.ObjectId, ref: "Service", virtual: true },
    ],
  },
  {
    timestamps: true,
  }
);

categorySchema.virtual(" serviceView", {
  ref: "service",
  localField: "serviceList",
  foreignField: "_id",
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Category", categorySchema);
