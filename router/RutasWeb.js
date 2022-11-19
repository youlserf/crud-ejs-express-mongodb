const express = require("express");
const router = express.Router();

const Contacto = require("../models/contacto");

router.get("/", async (req, res) => {
  try {
    const arrayContactos = await Contacto.find();
    console.log(arrayContactos);
    res.render("contactos", {
      arrayContactos,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
