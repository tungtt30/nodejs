const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Course = new Schema({
  name:{ type:String, maxLength: 255 },
  des:{ type:String },
  image:{type:String},
  slut:{type:String},
  createdAt:{ type: Date, default: Date.now },
  updatedAt:{ type: Date, default: Date.now },
});


module.exports = mongoose.model('Course', Course);