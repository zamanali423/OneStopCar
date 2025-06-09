const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String },
  model: { type: String },
  years: [
    {
      from: { type: Number },
      to: { type: Number },
      beams: [
        {
          beam: { type: String },
          category: { type: String },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("categories", categorySchema);
