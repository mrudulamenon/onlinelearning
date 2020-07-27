const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var SubjectSchema = new Schema({
    subject : String
});
var Subjectdata = mongoose.model('subject', SubjectSchema);

module.exports = Subjectdata;
