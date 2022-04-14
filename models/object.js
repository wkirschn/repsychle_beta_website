const mongoose = require('mongoose');
const {Double} = require("mongodb");
const Schema = mongoose.Schema;


const objectSchema = new Schema({
    objectName: {
        type: String,
        required: true
    },
    objectDescription: {
      type: String,
      required: true
    },
    objectCategory: {
        type: String,
        required: true
    },
    disposalMethod: {
        type: String,
        required: true
    },
    disposalRegionLatitude: {
        type: Number,
        required: true
    },
    disposalRegionLongitude: {
        type: Number,
        required: true
    },
    ecoScore: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Object = mongoose.model('Object', objectSchema);
module.exports = Object;