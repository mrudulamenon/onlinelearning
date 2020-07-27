const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var TeacherSchema = new Schema({
    user_id : String,
    email : String,
    t_id : Number,
    t_desig : String,
    t_name : String,
    t_address : String,
    t_phone : String,
    t_classteacherof : String,
    t_div : String,
    t_subjects : Array,
    t_classes : Array
});
var Teacherdata = mongoose.model('teacher', TeacherSchema);

module.exports = Teacherdata;
