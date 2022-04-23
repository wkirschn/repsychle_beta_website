// Import mongoose
const mongoose = require('mongoose');

// Schema to create the Database Object, all objects will be viewed accordingly

const recyclingSchemaDefinition = {

    objectName: {
        type: String,
        required: true
    },
    objectDescription: {
        type: String,
        required: true
    },
    objectEcoScore: {
        type: String,
        required: true
    },

    objectDisposalMethod: {
        type: String,
        required: true
    },
    file: {
        type: Object,
        required: true,

    },

    objectLong: {
        type: Number,
        required: true
    },

    objectLat: {
        type: Number,
        required: true
    },
    profile_id: {
        type: String,
        required: true
    }
};

// Sending off the object that was created with a Timestamp for possible future use
var recyclingSchema = new mongoose.Schema(recyclingSchemaDefinition, {timestamps: true});

// Create the model of the schema and export


module.exports = mongoose.model('Recycle', recyclingSchema);;
// alternative > module.exports = mongoose.model('Project', projectsSchema);