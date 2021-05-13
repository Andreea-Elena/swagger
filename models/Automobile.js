const mongoose = require('mongoose');
//require('mongoose-currency').loadType(mongoose);
//const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

// Document Schema.
const automobileSchema = new Schema({
    symboling: {
        type: Number,
        required: true
    },
    normalizedlosses: {
        type: Number,
    },
    make: {
        type: String,
        required: true
    },
    fueltype: {
        type: String,
        required: true
    },
    aspiration: {
        type: String,
        required: true
    },
    numofdoors: {
        type: String,     
    },
    bodystyle: {
        type: String,
        required: true
    },
    drivewheels: {
        type: String,
        required: true
    },
    enginelocation: {
        type: String,
        required: true
    },
    wheelbase: {
        type: Number,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    curbweight: {
        type: Number,
        required: true
    },
    enginetype: {
        type: String,
        required: true
    },
    numofcylinders: {
        type: String,
        required: true
    },
    enginesize: {
        type: Number,
        required: true
    },
    fuelsystem: {
        type: String,
        required: true
    },
    bore: {
        type: Number,
    },
    stroke: {
        type: Number,
    },
    compressionratio: {
        type: Number,
        required: true
    },
    horsepower: {
        type: Number,
    },
    peakrpm: {
        type: Number,
    },
    citympg: {
        type: Number,
        required: true
    },
    highwaympg: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 5000,
        max: 50000
    },
}, {
    timestamps: true
});

// This automatically creates the collection (table) named as "Dishes" if it doesn't find it.
var Automobile = mongoose.model('automobiles', automobileSchema);

module.exports = Automobile;