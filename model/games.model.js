const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  title: String,
  description: String,
  url: String,
  iframe: String,
  love_game: Boolean,
  how2play: String,
  mobile_game: Boolean,
});
const games = mongoose.model("game", exerciseSchema);
module.exports = games;
