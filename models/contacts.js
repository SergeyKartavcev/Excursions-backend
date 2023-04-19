const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  phoneNumbers: {
    type: String,
  },
  telegram: {
    type: String,
  },
  viber: {
    type: String,
  },
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
