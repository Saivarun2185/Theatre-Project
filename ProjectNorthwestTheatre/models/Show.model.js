/* Author: santhosh Bonala */
const mongoose = require('mongoose')

var ShowSchema = new mongoose.Schema({
    ShowTitle : {
        type : String,
        trim : true
    },
    ShowPlayWright: {
        type: String,
        trim: true
    },
    ShowDescription : {
        type : String,
        trim: true
    },
    ShowTime : {
        type : String,
        trim: true
    },
    ShowDate : {
        type : String,
        trim: true,
        default: Date()
    },
    NumberOfTickets : {
        type : Number,
        min : [0, 'Total Number of tickets cannot be negative']
    },
    isPublished : {
        type : Boolean
    },
    ShowPriceForAdult : {
        type : Number,
        min : [0, 'Price Cannot be negative']
    },
    ShowPriceForChildren: {
        type: Number,
        min: [0, 'Price Cannot be negative']
    },
    ShowRating : {
        type : String,
        trim : true
    },
    ReservedSeats: {
        type: Number,
        default: 0,
        min: [0, 'Tickets Reserved Cannot be negative']
    },
    ShowVenue: {
        type: String,
        trim: true
    },
    Ticketdetails: {
        type: Array
    }
})

module.exports = mongoose.model('Show',ShowSchema)