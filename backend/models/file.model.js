const mongoose = require('mongoose');
const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    canvasData:{
        type: Object,
        required: true,
        default: {},
    },
    thumbnail:{
        type: String,
        required: false,
        default: "",
    },
    linkSharing: {
        enabled: { type: Boolean, default: false },
        role: { type: String, enum: ["viewer", "editor"], default: "viewer" }
    }
},
);
module.exports = mongoose.model("File", FileSchema);