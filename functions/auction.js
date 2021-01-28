const auctions = require("../BeedAPI/models/auctions");
const bodyParser = require("body-parser");

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

async function setData() {
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
}

exports.handler = async function(event, context) {
    try {
        const data = await setData();
        return {
          statusCode: 200,
          body: JSON.stringify({ id: data._id })
        };
      } catch (err) {
        console.log(err); // output to netlify function log
        return {
          statusCode: 500,
          body: JSON.stringify({ msg: err.message }) 
        };
      }
}
