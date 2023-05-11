const Contact = require("../models/contacts");


exports.createContact = async (req, res) => {
  try {
    const {
      name,
      address,
      phoneNumbers,
      viber,
      telegram,
      facebook,
      instagram,
    } = req.body;

    const newContact = new Contact({
      name,
      address,
      phoneNumbers,
      viber,
      telegram,
      facebook,
      instagram,
    });

    const savedContact = await newContact.save();

    return res.status(201).json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
