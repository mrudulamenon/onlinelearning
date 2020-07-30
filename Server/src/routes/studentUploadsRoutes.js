const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
const path = require('path');

const studentUploadsRouter = express.Router();

const StudentUploadsData = require('../model/studentUploadsData');

studentUploadsRouter.get('/studentUploads', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    StudentUploadData.find()
        .then(function (studentUploads) {
            res.send(studentUploads);
        });
});

studentUploadsRouter.get('/s_uploads', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    StudentUploadsData.find()
        .then(function (studentuploads) {
            res.send(studentuploads);
        });
});

studentUploadsRouter.post('/filters_uploads', function (req, res) {
    console.log("inside rout");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let filterData = req.body;
    console.log(filterData);
    StudentUploadsData.find({ s_u_class: filterData.classs }, (err, filters_uploads) => {
        // if (err) {
        //     console.log("Error");
        //     console.log(err);
        // } else {
        //     console.log("got Student Upload");
        //     console.log(filters_uploads);
        //     if (!filters_uploads) {
        //         res.status(401).send("No Student Upload to display");
        //     }
        //     else {
                res.send(filters_uploads);
        //     }
        // }
    });
});

studentUploadsRouter.get('/edits_upload/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    console.log(id);
    StudentUploadsData.findOne({ _id: id })
        .then(function(s_upload) {
            res.send(s_upload);
        });
});

studentUploadsRouter.get('/deletes_upload/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    StudentUploadsData.findOneAndDelete({ _id: id })
        .then(function (s_upload) {
            // res.send(s_upload);
            console.log(s_upload);
            StudentUploadsData.find()
                .then(function (s_uploads) {
                    res.send(s_uploads);
                });
        });
});

studentUploadsRouter.post('/adds_upload', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let s_uploadData = req.body;
    console.log(s_uploadData);
    let news_upload = new StudentUploadsData(s_uploadData);
    news_upload.save((err, addedTUpload) => {
        if (err) {
            console.log(err);
            res.status(401).send("Could not add Student Upload");
        }
        else {
            res.send({ addedTUpload });
        }
    });
});


studentUploadsRouter.post('/updates_upload', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let s_uploadData = req.body;
    // let news_upload = new StudentUploadsData(s_uploadData);

    StudentUploadsData.findOne({ _id: s_uploadData._id })
        .then(function (s_uploadret) {
            if (!s_uploadret) {
                return next(new Error('Could not find Student Upload'));
            }
            else {
                var s_uploadupdate = new StudentUploadsData(s_uploadData);
                console.log("findOne" + s_uploadret)
                // s_uploadupdate.save();
                console.log("findOne update" + s_uploadupdate)
                StudentUploadsData.findByIdAndUpdate(s_uploadupdate._id, s_uploadupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});



module.exports = studentUploadsRouter;

