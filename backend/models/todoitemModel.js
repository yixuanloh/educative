const mongoose = require("mongoose");

const todoitemSchema = new mongoose.Schema({
  itemName: { type: String, required: true }
});

module.exports = TODOITEM = mongoose.model("todoitem", todoitemSchema);
