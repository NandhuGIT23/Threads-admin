const express = require("express");
const Registration = require("../models/registrationModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  console.log("register route");

  const {
    name,
    department,
    selectedCollege,
    email,
    number,
    selectedEvents,
    selectedWorkshops,
    selectedYear,
    payment,
  } = req.body;

  try {
    const user = await Registration.create({
      name,
      department,
      selectedCollege,
      email,
      number,
      selectedEvents,
      selectedWorkshops,
      selectedYear,
      payment,
    });
    if (user) {
      console.log("Registration created");
    }
    res.json({ success: true });
    res.status(200);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
