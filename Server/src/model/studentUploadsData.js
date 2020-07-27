const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var StudentUploadSchema = new Schema({
    teacherUploadId:String,
    email : String,
    description : String,
    upload : String,
    t_comment : String
});
var StudentUploaddata = mongoose.model('studentupload', StudentUploadSchema);

module.exports = StudentUploaddata;
