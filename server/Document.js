const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  title: {
    type: String,
    default: "Untitled Document"
  },
  data: Object,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = model("Document", Document)
