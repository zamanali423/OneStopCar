const { default: mongoose } = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  subject: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("contacts", contactsSchema);
