const express = require("express");
const router = express.Router();
const auctions = require("../models/auctions");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/auction", async (req, res) => {
  const auction = new auctions({
    title: req.body.title,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    picture: req.body.picture,
  });

  try {
    const savedAuction = await auction.save();
    res.json(savedAuction);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
