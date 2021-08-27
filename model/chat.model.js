const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  username: String,
  mess: String,
  image: String,
  time: String,
  color: String,
});
const chats = mongoose.model("chat", exerciseSchema);
module.exports = chats;
