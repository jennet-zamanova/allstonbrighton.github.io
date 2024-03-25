const mongoose = require("mongoose");

const CensusSchema = new mongoose.Schema({
  type: String,
  name: String,
  crs: { type: String, properties: { name: String } },
  features: Array,
});

module.exports = mongoose.model("census", CensusSchema);
