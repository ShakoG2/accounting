const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creatorUserId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    lastModifiedUserId: {
        type: String,
        required: true
    },
    lastUpdatedDate: {
        type: Date,
        required: true
    }
});

const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;