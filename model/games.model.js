const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  title: String,
  description: String,
  url: String,
  publish: Boolean,
});
const games = mongoose.model("game", exerciseSchema);
module.exports = games;
