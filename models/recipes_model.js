const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const schema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
    unique: true,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  ingredients: {
    type: Array,
    required: true,
    default: [],
  },
  created_at: { type: Date, default: Date.now },
});

schema.plugin(aggregatePaginate);
module.exports = mongoose.model("Recipe", schema);
