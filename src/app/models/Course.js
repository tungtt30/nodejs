const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, required: true },
        des: { type: String },
        image: { type: String },
        slut: { type: String, slug: 'name', unique: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
    },
);

Course.plugin(AutoIncrement);
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deleteAt: true });

module.exports = mongoose.model('Course', Course);
