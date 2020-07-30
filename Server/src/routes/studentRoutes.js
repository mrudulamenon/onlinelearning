const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const studentRouter = express.Router();

const StudentData = require('../model/studentData');

studentRouter.get('/students', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    StudentData.find().sort({"s_class":1})
        .then(function (students) {
            res.send(students);
        });
});

studentRouter.post('/filterstudents', function (req, res) {
    // console.log("inside rout");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let filterData = req.body;
    // console.log(filterData);
    StudentData.find({ $and: [{ s_class: filterData.s_class }, { s_div: filterData.s_div }] }).sort({"s_name":1}).exec( (err, filterstudents) => {
        if (err) {
            // console.log("Error");
            console.log(err);
        } else {
            // console.log("got Student");
            console.log(filterstudents);
            if (!filterstudents) {
                res.status(401).send("No students to display");
            }
            else {
                res.send(filterstudents);
            }
        }
    });
});

studentRouter.get('/editstudent/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    StudentData.findOne({ _id: id })
        .then(function (student) {
            res.send(student);
        });
});

studentRouter.get('/deletestudent/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    StudentData.findOneAndDelete({ _id: id })
        .then(function (student) {
            // res.send(student);
            console.log(student);
            StudentData.find().sort({"s_class":1})
                .then(function (students) {
                    res.send(students);
                });
        });
});

studentRouter.post('/addstudent', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let studentData = req.body;
    console.log(studentData);
    let newstudent = new StudentData(studentData);
    StudentData.findOne({ s_id: studentData.s_id }, (err, student) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got Student");
            console.log(student);
            if (!student) {
                newstudent.save((err, addedStudent) => {
                    if (err) {
                        console.log(err);
                        res.status(401).send("Could not add Student");
                    }
                    else {
                        res.send({ addedStudent });
                        // let payload = { student: student._id }
                        // let token = jwt.sign(payload, 'secretKey')
                        // res.status(200).send({ token })
                        // res.status(200).send(addedStudent);
                    }
                });
            }
            else {
                res.status(401).send("Student already added");
            }
        }
    });
});


studentRouter.post('/updatestudent', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let studentData = req.body;
    // let newstudent = new StudentData(studentData);

    StudentData.findOne({ _id: studentData._id })
        .then(function (studentret) {
            if (!studentret) {
                return next(new Error('Could not find Student'));
            }
            else {
                var studentupdate = new StudentData(studentData);
                console.log("findOne" + studentret)
                // studentupdate.save();
                console.log("findOne update" + studentupdate)
                StudentData.findByIdAndUpdate(studentupdate._id, studentupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});


module.exports = studentRouter;
