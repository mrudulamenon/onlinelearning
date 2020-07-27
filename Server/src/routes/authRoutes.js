const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
// const appjs = require(__dirname);
const authRouter = express.Router();

const UserData = require('../model/userData');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request -1');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized Request -2');
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized Request-3');
    }
    req.user_id = payload.subject;
    res.usertype = payload.type;
    // console.log(req.user_id);
    // console.log(res.usertype);
    next();
}
authRouter.get('/validatepage', verifyToken, function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.send("Authorisation");
});
authRouter.get('/adminusers', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    UserData.find({ usertype: 'admin' }, (err, users) => {
        res.send(users);
    });
});
authRouter.get('/edituser/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    UserData.findOne({ _id: id })
        .then(function (user) {
            res.send(user);
        });
});

authRouter.get('/deleteuser/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.params.id;
    UserData.findOneAndDelete({ _id: id })
        .then(function (user) {
            res.send(user);
        });
});

authRouter.post('/updateuser', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    let userData = req.body;
    // let newuser = new UserData(userData);

    UserData.findOne({ _id: userData._id })
        .then(function (userret) {
            if (!userret) {
                return next(new Error('Could not find User'));
            }
            else {
                var userupdate = new UserData(userData);
                console.log("findOne" + userret)
                // userupdate.save();
                console.log("findOne update" + userupdate)
                UserData.findByIdAndUpdate(userupdate._id, userupdate, (er, updated) => {
                    console.log("updated" + updated);
                    res.send(updated);
                });
            }
        });
});

authRouter.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let userData = req.body;
    let newuser = new UserData(userData);
    UserData.findOne({ $and: [{ email: userData.email }, { usertype: userData.usertype }] }, (err, user) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got user");
            console.log(user);
            if (!user) {
                newuser.save((err, registeredUser) => {
                    if (err) {
                        console.log(err);
                        res.status(401).send("Could not register");
                    }
                    else {
                        res.send(registeredUser);
                        // res.send({ registeredUser });
                        // let payload = { subject: user._id }
                        // let token = jwt.sign(payload, 'secretKey')
                        // res.status(200).send({ token })
                        // res.status(200).send(registeredUser);
                    }
                });
            }
            else {
                res.status(401).send("E-mail already registered");
            }
        }
    });
});

authRouter.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

    let userData = req.body;
    console.log("inside login");
    console.log(userData);
    UserData.findOne({ $and: [{ email: userData.email }, { usertype: userData.usertype }] }, (err, user) => {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("got user");
            console.log(user);
            if (!user) {
                console.log("Email Error");
                res.status(401).send('Invalid Email');
            } else
                if (user.password !== userData.password) {
                    console.log("Pswd Error");
                    res.status(401).send('Invalid Password');
                } else {
                    let payload = { subject: user._id, email: user.email, type: user.usertype };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token, payload });
                    // res.status(200).send(user);
                }
        }
    });
});
module.exports = authRouter;
