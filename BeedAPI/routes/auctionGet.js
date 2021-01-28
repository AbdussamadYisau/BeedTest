const express = require("express");
const router = express.Router();
const auctions = require("../models/auctions");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/auction", async (req, res) => {
  try {
    const getAuctions = await auctions.find();
    res.json(getAuctions);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
