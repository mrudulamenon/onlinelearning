const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const teacherUploadsRouter = express.Router();

const TeacherUploadsData = require('../model/teacherUploadsData');


teacherUploadsRouter.get('/teacherUploads', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    TeacherUploadData.find()
        .then(function (teacherUploads) {
            res.send(teacherUploads);
        });
});
module.exports = teacherUploadsRouter;
