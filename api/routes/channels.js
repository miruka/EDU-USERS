const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const shortid = require("shortid");

let channels = [];

//Get Channels
router.get("/", (req, res) => {
  res.status(200).json({
    Channels: "Aquired Channels",
  });
});

//Post new Channels
router.post("/channels", (req, res) => {
  const channelInfo = {
    id: uuidv4(),
    name: req.body.name,
    lessonId: shortid.generate(),
    cohort: req.body.cohort,
  };
  channels.push(channelInfo);

  res.status(201).json({
    Message: "Creaated Channel Successfully",
    ChannelInformation: channelInfo,
  });
});

//Get all Channels
router.get("/channels", (req, res) => {
  res.status(200).json(channels);
});

//Delete Channel
router.delete("/channels/:deleteId", (req, res) => {
  const { deleteId } = req.params;
  const deleted = channels.find((channel) => channel.id === deleteId);
  console.log(deleted.id);

  if (deleted) {
    channels.filter((channel) => channel.id !== deleteId);
    res.status(200).json(deleted);
  } else {
    res.status(404).json({
      Message: "Channel NOT FOUND",
    });
  }
});
module.exports = router;
