const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var ClassSchema = new Schema({
    classs : String,
    section : String,
    subjects : Array
});
var Classdata = mongoose.model('class', ClassSchema);

module.exports = Classdata;
