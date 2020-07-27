const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const adminRouter = express.Router();

const ClassData = require('../model/classData');
const SubjectData = require('../model/subjectData');



adminRouter.get('/subjects', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    SubjectData.find()
        .then(function (subjects) {
            res.send(subjects);
        });
});

adminRouter.get('/editsubject/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    SubjectData.findOne({ _id: id })
        .then(function (subject) {
            res.send(subject);
        });
});

adminRouter.get('/deletesubject/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    SubjectData.findOneAndDelete({ _id: id })
        .then(function (subject) {
            res.send(subject);
        });
});

adminRouter.post('/addsubject', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let subjectData = req.body;
    let newsubject = new SubjectData(subjectData);
    SubjectData.findOne({ subject: subjectData.subject }, (err, subject) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got subject");
            console.log(subject);
            if (!subject) {
                newsubject.save((err, addedSubject) => {
                    if (err) {
                        console.log(err);
                        res.status(401).send("Could not add Subject");
                    }
                    else {
                        res.send({ addedSubject });
                        // let payload = { subject: subject._id }
                        // let token = jwt.sign(payload, 'secretKey')
                        // res.status(200).send({ token })
                        // res.status(200).send(addedSubject);
                    }
                });
            }
            else {
                res.status(401).send("Subject already added");
            }
        }
    });
});


adminRouter.post('/updatesubject', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let subjectData = req.body;
    // let newsubject = new SubjectData(subjectData);

    SubjectData.findOne({ _id: subjectData._id })
        .then(function (subjectret) {
            if (!subjectret) {
                return next(new Error('Could not find Subject'));
            }
            else {
                var subjectupdate = new SubjectData(subjectData);
                console.log("findOne" + subjectret)
                // subjectupdate.save();
                console.log("findOne update" + subjectupdate)
                SubjectData.findByIdAndUpdate(subjectupdate._id, subjectupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});
//Class Routes

adminRouter.get('/classes', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    ClassData.find()
        .then(function (classes) {
            res.send(classes);
        });
});
adminRouter.get('/editclasss/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ClassData.findOne({ _id: id })
        .then(function (classs) {
            res.send(classs);
        });
});

adminRouter.get('/deleteclasss/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    ClassData.findOneAndDelete({ _id: id })
        .then(function (classs) {
            res.send(classs);
        });
});

adminRouter.post('/addclasss', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let classsData = req.body;
    let newclasss = new ClassData(classsData);
    ClassData.findOne({ classs: classsData.classs }, (err, classs) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got Class");
            console.log(classs);
            if (!classs) {
                newclasss.save((err, addedClass) => {
                    if (err) {
                        console.log(err);
                        res.status(401).send("Could not add Class");
                    }
                    else {
                        res.send({ addedClass });
                        // let payload = { classs: classs._id }
                        // let token = jwt.sign(payload, 'secretKey')
                        // res.status(200).send({ token })
                        // res.status(200).send(addedClass);
                    }
                });
            }
            else {
                res.status(401).send("Class already added");
            }
        }
    });
});


adminRouter.post('/updateclasss', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let classsData = req.body;
    // let newclasss = new ClassData(classsData);

    ClassData.findOne({ _id: classsData._id })
        .then(function (classsret) {
            if (!classsret) {
                return next(new Error('Could not find Class'));
            }
            else {
                var classsupdate = new ClassData(classsData);
                console.log("findOne" + classsret)
                // classsupdate.save();
                console.log("findOne update" + classsupdate)
                ClassData.findByIdAndUpdate(classsupdate._id, classsupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});


module.exports = adminRouter;


