const express = require("express");
const Details = require("../models/detailsModel");
const Count = require("../models/countModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  console.log("register route");

  const details = ({
    name,
    department,
    selectedCollege,
    email,
    number,
    selectedEvents,
    selectedWorkshops,
    selectedYear,
    selectedPayment,
  } = req.body);
  const user = await Details.findOne({ email });

  let workshop = selectedWorkshops;
  const a = await Count.findOne({ _id: "65c9f395fde61a170c9bff55" });
  console.log("A:", a);
  let uiuxc = a.uiux;
  let cyberc = a.cyber;
  let flutterc = a.flutter;
  let webc = a.web;

  if (user) {
    console.log("IF BLOCK");
    try {
      // console.log(typeof (user.selectedEvents));

      if (user.selectedWorkshops == "false") {
        if (workshop == "uiux") {
          if (uiuxc >= 100) {
            res.json({ msgg: "UIUX workshop is filled", flag: false });
            return;
          }
          await Count.updateOne(
            { _id: "65c9f395fde61a170c9bff55" },
            { $inc: { uiux: 1 } }
          );
        } else if (workshop == "flutter") {
          if (flutterc > 100) {
            res.json({ msgg: "Flutter workshop is filled", flag: false });
            return;
          }
          await Count.updateOne(
            { _id: "65c9f395fde61a170c9bff55" },
            { $inc: { flutter: 1 } }
          );
        } else if (workshop == "web_development") {
          if (webc > 100) {
            res.json({
              msgg: "Web Development workshop is filled",
              flag: false,
            });
            return;
          }
          await Count.updateOne(
            { _id: "65c9f395fde61a170c9bff55" },
            { $inc: { web: 1 } }
          );
        } else if (workshop == "cyber_security") {
          if (cyberc > 100) {
            res.json({
              msgg: "Cyber_Security workshop is filled",
              flag: false,
            });
            return;
          }
          await Count.updateOne(
            { _id: "65c9f395fde61a170c9bff55" },
            { $inc: { cyber: 1 } }
          );
        }

        const mes = await Details.updateOne(
          { email: email },
          { $set: { selectedWorkshops: selectedWorkshops } }
        );
      }
      if (user.selectedEvents == "false") {
        const mes = await Details.updateOne(
          { email: email },
          { $set: { selectedEvents: selectedEvents } }
        );
      }

      if (user.selectedEvents == "true" && user.selectedWorkshops != "false") {
        return res.json({
          msgg: "You have already registerd for both events and workshop",
          flag: false,
        });
      }
    } catch (e) {
      console.log(e);
    }

    // res.status(200).json({
    //   msgg: "Successfully registered! You will receive a confirmation mail shortly",
    //   flag: true,
    // });
  } else {
    console.log("ELSE BLOCK");
    try {
      if (workshop == "uiux") {
        if (uiuxc > 100) {
          return res.json({ msgg: "UIUX workshop is filled", flag: false });
        }
        await Count.updateOne(
          { _id: "65c9f395fde61a170c9bff55" },
          { $inc: { uiux: 1 } }
        );
      } else if (workshop == "flutter") {
        if (flutterc > 100) {
          res.json({ msgg: "Flutter workshop is filled", flag: false });
          return;
        }
        await Count.updateOne(
          { _id: "65c9f395fde61a170c9bff55" },
          { $inc: { flutter: 1 } }
        );
      } else if (workshop == "web_development") {
        if (webc > 100) {
          res.json({ msgg: "Web Development workshop is filled", flag: false });
          return;
        }
        await Count.updateOne(
          { _id: "65c9f395fde61a170c9bff55" },
          { $inc: { web: 1 } }
        );
      } else if (workshop == "cyber_security") {
        if (cyberc > 100) {
          res.json({ msgg: "Cyber_Security workshop is filled", flag: false });
          return;
        }
        await Count.updateOne(
          { _id: "65c9f395fde61a170c9bff55" },
          { $inc: { cyber: 1 } }
        );
      }
      const approval = await Details.create({
        name,
        department,
        selectedCollege,
        email,
        number,
        selectedEvents,
        selectedWorkshops,
        selectedYear,
        selectedPayment,
      });
      console.log("Line 155 created");
      // let workshop=selectedWorkshops;
      if (approval) console.log("Approval created");

      res.status(200).json({
        msgg: "Successfully registered! You will receive a confirmation mail shortly",
        flag: true,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
});

router.post("/uiux", async (req, res) => {
  const { key } = req.body;
  console.log(key);
  const user = await Details.findOne({ _id: key });
  if (user) {
    const name = user.name;
    const college = user.selectedCollege;
    const workshop = user.selectedWorkshops;
    const events = user.selectedEvents;
    res.json({ name, college, workshop, events }).status(200);
  }
});

module.exports = router;
