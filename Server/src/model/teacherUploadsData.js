const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var TeacherUploadSchema = new Schema({
    user_id: String,
    classs: String,
    subjects: Array,
    topic: String,
    title: String,
    description: String,
    category: String,
    upload: String,
    t_u_date: Date
});
var TeacherUploaddata = mongoose.model('teacherupload', TeacherUploadSchema);

module.exports = TeacherUploaddata;
