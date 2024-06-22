const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const EntryModel = mongoose.model("Entry", EntrySchema);

module.exports = EntryModel;
