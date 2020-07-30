const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/LearningDb');
const Schema = mongoose.Schema;
var StudentUploadSchema = new Schema({
    t_upload_id: String,
    user_id: String,
    description: String,
    upload: String,
    t_comment: String,
    s_u_date: Date
});
var StudentUploaddata = mongoose.model('studentupload', StudentUploadSchema);

module.exports = StudentUploaddata;
