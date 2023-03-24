const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Its type of entry and has two value  INCOME & OUTCOME"],
        enum: ["INCOME", "OUTCOME"]
    },
    amount: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    creatorUserId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: [true, "When payment is made," +
        " it has a rule after which it becomes complete, " +
        "for example, in the case of courier services," +
        " the order may have a processing status until the courier " +
        "delivers the package and after the package is complete"],

        enum: ["PROCESSING", "COMPLETED"]
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

const Entry = mongoose.model("entries", EntrySchema);

module.exports = Entry;