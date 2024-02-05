// Soap Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//
const soapSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    percentSuperFat: Number,
    ingredients: {
      ingredient1: String,
      amount1: Number,
      ingredient2: String,
      amount2: Number,
      ingredient3: String,
      amount3: Number,
      ingredient4: String,
      amount4: Number,
      ingredient5: String,
      amount5: Number,
      ingredient6: String,
      amount6: Number,
      ingredient7: String,
      amount7: Number,
      ingredient8: String,
      amount8: Number,
    },
    costPerBar: {
      type: Number,
      default: 5,
    },
    costPerPound: {
      type: Number,
      default: 55,
    },
    addCostToGiftWrapPerBar: {
      type: Number,
      default: 1.5,
    },
    lyeCalculation: {
      minimumWaterNeeded: Number,
      sodiumHydroxide: Number,
    },
    totalOilsWeight: Number,
    totalRecipeWeight: Number,
    totalBarsAvail: Number,
    notes: String,
    category: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Soap", soapSchema);
