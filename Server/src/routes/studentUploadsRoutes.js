const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const studentUploadsRouter = express.Router();

const TeacherUploadsData = require('../model/teacherUploadsData');

studentUploadsRouter.get('/studentUploads', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    StudentUploadData.find()
        .then(function (studentUploads) {
            res.send(studentUploads);
        });
});
module.exports = studentUploadsRouter;

