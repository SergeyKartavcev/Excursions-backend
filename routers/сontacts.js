const routers = require("express").Router();
const { getAllContacts, createContact, deleteContact } = require("../controllers/contacts");


routers.get("/", getAllContacts);
routers.post("/", createContact);
routers.delete("/:id", deleteContact);

module.exports = routers;
