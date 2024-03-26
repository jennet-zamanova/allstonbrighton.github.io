const mongoose = require("mongoose");
const GeoJSON = require("mongoose-geojson-schema");

// got from chatgpt
const CRSSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["name"], required: true },
    properties: {
      name: { type: String, required: true },
    },
  },
  { _id: false }
); // Exclude _id field from CRS sub-document

const CensusSchema = new mongoose.Schema({
  type: { type: String, enum: ["FeatureCollection"], required: true },
  name: String,
  features: [mongoose.Schema.Types.Feature], // Array of Feature documents
  crs: CRSSchema, // CRS information
});

module.exports = mongoose.model("census", CensusSchema);
