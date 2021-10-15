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
const Device  = require('./models/device'); 
const User    = require('./models/user');
const CDevice = require('./models/cdevice'); 

const app = express();

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * @api {post} /api/devices Add a new device to the array
 * @apiGroup Device
 * 
 * @apiParam {String} [name]       Device's name
 * @apiParam {String} [user]       User
 * @apiParam {Object} [sensorData] Device's sensor data
 * 
 * @apiSuccessExample Success-Response:
 * {
 *  "Sucessfully added device and data"
 * }
 * 
 * @apiErrorExample Error-Response:
 * {
 *  "Device already exist"
 * }
 */
app.post('/api/devices', (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
      name,
      user,
      sensorData
    });
    newDevice.save(err => {
      return err
        ? res.send(err)
        : res.send('successfully added device and data');
    });
});

/**
 * @api {post} /api/chosen-devices Add a device name to the array for later searching
 * @apiGroup CDevice
 * 
 * @apiParam {String} [name]       Device's name
 * 
 * @apiSuccessExample Success-Response:
 * {
 *  "Sucessfully added device and data"
 * }
 * 
 * @apiErrorExample Error-Response:
 * {
 *  "Device already exist"
 * }
 */
app.post('/api/chosen-devices', (req, res) => {
    const { name } = req.body;

    CDevice.findOne({name: "a" }, (err, device) => {
        if (err) {
          console.log(err)
        }
          const { chosenDevice } = device;

          chosenDevice.push({ name });
          device.chosenDevice = chosenDevice;
  
          device.save(err => {
            if (err) {
              console.log(err)
            }
          });
      });
});

/**
* @api {get} /api/devices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*  {
*    "_id": "614c9ea50ce45bd45a3e56be",
*    "name": "laptop",
*    "user": "hussain",
*    "sensorData": [
*      {
*        "ts": 1632412759074,
*       "loc": {
*          "lat": "-18.39522",
*          "lon": "-93.39309"
*        },
*        "temp": 49
*      },
*      {
*        "ts": 1632412781149,
*        "loc": {
*          "lat": "35.0871",
*          "lon": "-19.18277"
*        },
*        "temp": 43
*      }
*    ],
*    "__v": 2
*  }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "Device does not exist"
*  }
*/
app.get('/api/devices', (req, res) => {
    Device.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
});

/**
* @api {get} /api/devices/data An array of all devices for later data displaying
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*  {
*    "_id": "614c9ea50ce45bd45a3e56be",
*    "name": "laptop",
*    "user": "hussain",
*    "sensorData": [
*      {
*        "ts": 1632412759074,
*       "loc": {
*          "lat": "-18.39522",
*          "lon": "-93.39309"
*        },
*        "temp": 49
*      },
*      {
*        "ts": 1632412781149,
*        "loc": {
*          "lat": "35.0871",
*          "lon": "-19.18277"
*        },
*        "temp": 43
*      }
*    ],
*    "__v": 2
*  }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "Device does not exist"
*  }
*/
app.get('/api/devices/data', (req, res) => {
    Device.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
});

/**
* @api {get} /api/chosen-device  An array of chosen devices' name
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*[
*  {
*    "_id": "6168c67eda19306355ae9cef",
*    "name": "a",
*    "chosenDevice": [
*      {
*        "name": "f"
*      },
*      {
*        "name": "laptop"
*      },
*      {
*       "name": "ll"
*      }
*    ],
*    "__v": 3
*  }
*]
* @apiErrorExample {json} Error-Response:
*  {
*    "Data does not exist"
*  }
*/
app.get('/api/chosen-device', (req, res) => {
    CDevice.find({}, (err, devices) => {
     return err
       ? res.send(err)
       : res.send(devices);
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});