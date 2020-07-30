const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const teacherRouter = express.Router();

const TeacherData = require('../model/teacherData');

teacherRouter.get('/teachers', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    TeacherData.find().sort({"email":1})
        .then(function (teachers) {
            res.send(teachers);
        });
});

teacherRouter.get('/editteacher/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    TeacherData.findOne({ _id: id })
        .then(function (teacher) {
            res.send(teacher);
        });
});

teacherRouter.get('/deleteteacher/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    TeacherData.findOneAndDelete({ _id: id })
        .then(function (teacher) {
            // res.send(teacher);
            console.log(teacher);
            TeacherData.find().sort({"t_name":1})
                .then(function (teachers) {
                    res.send(teachers);
                });            
        });
});

teacherRouter.post('/addteacher', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let teacherData = req.body;
    console.log(teacherData);
    let newteacher = new TeacherData(teacherData);
    TeacherData.findOne({ t_id: teacherData.t_id }, (err, teacher) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got Teacher");
            console.log(teacher);
            if (!teacher) {
                newteacher.save((err, addedTeacher) => {
                    if (err) {
                        console.log(err);
                        res.status(401).send("Could not add Teacher");
                    }
                    else {
                        res.send({ addedTeacher });
                        // let payload = { teacher: teacher._id }
                        // let token = jwt.sign(payload, 'secretKey')
                        // res.status(200).send({ token })
                        // res.status(200).send(addedTeacher);
                    }
                });
            }
            else {
                res.status(401).send("Teacher with same teacherId already added");
            }
        }
    });
});


teacherRouter.post('/updateteacher', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let teacherData = req.body;
    // let newteacher = new TeacherData(teacherData);

    TeacherData.findOne({ _id: teacherData._id })
        .then(function (teacherret) {
            if (!teacherret) {
                return next(new Error('Could not find Teacher'));
            }
            else {
                var teacherupdate = new TeacherData(teacherData);
                console.log("findOne" + teacherret)
                // teacherupdate.save();
                console.log("findOne update" + teacherupdate)
                TeacherData.findByIdAndUpdate(teacherupdate._id, teacherupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});


module.exports = teacherRouter;

