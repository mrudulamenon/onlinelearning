const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const path = require('path');

const teacherUploadsRouter = express.Router();

const TeacherUploadsData = require('../model/teacherUploadsData');


teacherUploadsRouter.get('/t_uploads', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    TeacherUploadsData.find()
        .then(function (teacheruploads) {
            res.send(teacheruploads);
        });
});

teacherUploadsRouter.post('/filtert_uploads', function (req, res) {
    console.log("inside rout");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let filterData = req.body;
    console.log(filterData);
    TeacherUploadsData.find({ $and: [{ classs: filterData.classs }, { subjects: filterData.subjects }] }, (err, filtert_uploads) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got Teacher Upload");
            console.log(filtert_uploads);
            if (!filtert_uploads) {
                res.status(401).send("No Teacher Upload to display");
            }
            else {
                res.send(filtert_uploads);
            }
        }
    });
});

teacherUploadsRouter.get('/editt_upload/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    TeacherUploadsData.findOne({ _id: id })
        .then(function (t_upload) {
            res.send(t_upload);
        });
});

teacherUploadsRouter.get('/deletet_upload/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    TeacherUploadsData.findOneAndDelete({ _id: id })
        .then(function (t_upload) {
            // res.send(t_upload);
            console.log(t_upload);
            TeacherUploadsData.find()
                .then(function (t_uploads) {
                    res.send(t_uploads);
                });
        });
});

teacherUploadsRouter.post('/addt_upload', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let t_uploadData = req.body;
    console.log(t_uploadData);
    let newt_upload = new TeacherUploadsData(t_uploadData);
    newt_upload.save((err, addedTUpload) => {
        if (err) {
            console.log(err);
            res.status(401).send("Could not add Teacher Upload");
        }
        else {
            res.send({ addedTUpload });
        }
    });
});


teacherUploadsRouter.post('/updatet_upload', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let t_uploadData = req.body;
    // let newt_upload = new TeacherUploadsData(t_uploadData);

    TeacherUploadsData.findOne({ _id: t_uploadData._id })
        .then(function (t_uploadret) {
            if (!t_uploadret) {
                return next(new Error('Could not find Teacher Upload'));
            }
            else {
                var t_uploadupdate = new TeacherUploadsData(t_uploadData);
                console.log("findOne" + t_uploadret)
                // t_uploadupdate.save();
                console.log("findOne update" + t_uploadupdate)
                TeacherUploadsData.findByIdAndUpdate(t_uploadupdate._id, t_uploadupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});


module.exports = teacherUploadsRouter;
