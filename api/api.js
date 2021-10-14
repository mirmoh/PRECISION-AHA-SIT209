const port = 5007;
const base = `${__dirname}/public`;

const express    = require('express')
const mongoose   = require('mongoose')
const morgan     = require('morgan')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
// const authRoute  = require('./routes/auth')

mongoose.connect('mongodb+srv://toanchungg:dunglinh19@cluster0.ag3kk.mongodb.net/mydb0', 
{useNewUrlParser: true, useUnifiedTopology: true });

//Device defines a schema for the device model and the collection it is associated with
const Device = require('./models/device'); 
// const User   = require('./models/user');
const app = express();

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

//add device 
app.post('/api/devices', (req, res) => {
    const { name, user } = req.body;
    const newDevice = new Device({
      name,
      user
    });
    newDevice.save(err => {
      return err
        ? res.send(err)
        : res.send('successfully added device and data');
    });
});


//device-list
app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
});

//display data
app.get('/api/devices/data', (req, res) => {
    Device.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// app.use('/api', authRoute);