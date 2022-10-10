const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');require('mongoose');
const db = mongoose.connection
const bodyParser = require('body-parser')
let userRouter = require('./Routes/user');
let adminRouter = require('./Routes/admin')

app.use(bodyParser())
app.use(cors({origin:true, credentials:true}))

mongoose.connect('mongodb://localhost:27017/User')

db.on('error',console.error.bind(console,'connection error'));

db.once('open',function(){
  console.log('Connected successfully');
})

app.use('/', userRouter);
app.use('/admin', adminRouter);


app.listen(5000,()=>{ console.log('server listening on port 5000') })