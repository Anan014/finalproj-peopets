const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    servicename: {
        type: String,
        max: 500,
    },
    servicetype: {
        type: String,
        max: 500,
    },
    servicelocation: {
        type: String,
        max: 500,
    },
    desc: {
        type: String,
        max: 500,
    },
    ServiceProfilePicture: {
        type: String,
        default: "",
    }
}, { timestamps: true });

module.exports = mongoose.model("Service", ServiceSchema)