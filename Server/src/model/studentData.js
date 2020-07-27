const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var StudentSchema = new Schema({
    user_id : String,
    email : String,
    s_id : Number,
    roll_no : Number,
    s_name : String,
    s_address : String,
    s_phone : String,
    s_class : String,
    s_div : String
});
var Studentdata = mongoose.model('student', StudentSchema);

module.exports = Studentdata;
