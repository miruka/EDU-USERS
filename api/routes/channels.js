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

//Get Single Channel
router.get("/channels/:getChannelId", (req, res) => {
  const { getChannelId } = req.params;
  const found = channels.find((channel) => channel.id === getChannelId);
  console.log(found);
  if (found) {
    res.status(200).json({
      Message: `Channel Found of ID: ${found.id}`,
      ChannelFound: found,
    });
  } else {
    res.status(404).json({
      Message: "CHANNEL DOES NOT EXIST",
    });
  }
});

//Update Channel
router.put("/channels/:getPutId", (req, res) => {
  const { getPutId } = req.params;
  //updated = req.body;
  const findChannel = channels.findIndex((channel) => channel.id === getPutId);
  if (findChannel !== -1) {
    //Found Channel
    channels[findChannel] = req.body;
    res.status(200).json({
      Message: "Updated Successfully",
      UpdatedProduct: channels[findChannel],
    });
  } else {
    //Channel NOT Found
    res.status(404).json({
      Message: "CHANNEL DOES NOT EXIST",
    });
  }
});

//Patch Channel
router.patch("/channels/:patchId", (req, res) => {
  const { patchId } = req.params;
  const foundChannel = channels.find((channel) => channel.id === patchId);

  if (foundChannel) {
    //When Channel is Found
    Object.assign(foundChannel, req.body);
    res.status(200).json({
      Message: "Channel Patched",
      PatchedChannel: foundChannel,
    });
  } else {
    //Channel NOT Found
    res.status(404).json({
      Message: "CHANNEL DOES NOT EXIST",
    });
  }
});

//Delete Channel
router.delete("/channels/:deleteId", (req, res) => {
  const { deleteId } = req.params;
  const deleted = channels.find((channel) => channel.id === deleteId);
  console.log(deleted.id);

  if (deleted) {
    channels = channels.filter((channel) => channel.id !== deleteId);
    res.status(200).json({
      Message: "Successfully deleted Channel",
      DeletedChannel: deleted,
    });
  } else {
    res.status(404).json({
      Message: "Channel NOT FOUND",
    });
  }
});
module.exports = router;
