const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');
const port = 3000;
const path = require('path');
const app = new express();
const authRouter = require('./src/routes/authRoutes');
const adminRouter = require('./src/routes/adminRoutes');
const teacherRouter = require('./src/routes/teacherRoutes');
const studentRouter = require('./src/routes/studentRoutes');
const teacherUploadsRouter = require('./src/routes/teacherUploadsRoutes');
const studentUploadsRouter = require('./src/routes/studentUploadsRoutes');
const { db } = require('./src/model/userData');

app.use(cors());
app.use(bodyparser.json());

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/teacheruploads', teacherUploadsRouter);
app.use('/studentuploads', studentUploadsRouter);
app.get('/', (req, res) => {
    res.send("Hello");
});

// function setHeader(res){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");    
// }
// function getDataApi(api_path,coll_name){    
//     app.get(api_path, function (req, res) {
//         setHeader(res);
//         coll_name.find()
//             .then(function (data) {
//                 res.send(data);
//             });
//     });    
// }

app.listen(port, function () {
    console.log('listening to port ' + port);
});