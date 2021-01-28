const mongoose = require('mongoose');


const auctionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    }, 
    endTime: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});




module.exports = mongoose.model('Auctions', auctionSchema);
