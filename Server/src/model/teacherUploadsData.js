const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var TeacherUploadSchema = new Schema({
    email : String,
    class : String,
    subject : String,
    topic : String,
    title : String,
    description : String,
    category : String,
    upload : String
});
var TeacherUploaddata = mongoose.model('teacherupload', TeacherUploadSchema);

module.exports = TeacherUploaddata;
