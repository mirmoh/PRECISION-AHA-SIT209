const port = 5077;

const randomCoordinates = require('random-coordinates');
const mqtt              = require('mqtt');
const express           = require('express');
const bodyParser        = require('body-parser');
const Device            = require('./models/device');
const CDevice           = require('./models/cdevice');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://toanchungg:dunglinh19@cluster0.ag3kk.mongodb.net/mydb0', 
{useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

//t7: CORS req res
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

//subscribe the MQTT app to the /sensorData topic when the app connects to the broker
client.on('connect', () => {
    client.subscribe('/sensorData');
    client.subscribe('/chosenDevice');
    console.log('mqtt connected');
})

//to write the data contained in the message to the device collection in our db
client.on('message', (topic, message) => {
  if (topic == '/sensorData') {
    const data = JSON.parse(message);
    
    Device.findOne({name: data.deviceId }, (err, device) => {
      if (err) {
        console.log(err)
      }
        console.log(data);
        const { sensorData } = device;
        const { ts, loc, temp } = data;
  
        sensorData.push({ ts, loc, temp });
        device.sensorData = sensorData;

        device.save(err => {
          if (err) {
            console.log(err)
          }
        });
    });
  }
});

//Generate "real" values for the required data object using some external packages
app.put('/sensor-data', (req, res) => {
  const { deviceId }  = req.body;

  const [lat, lon] = randomCoordinates().split(", ");
  const ts = new Date().getTime();
  const loc = { lat, lon };
  min  = Math.ceil(20);
  max  = Math.floor(50);
  temp = Math.floor(Math.random() * (max - min + 1) + min);

  const topic = `/sensorData`;
  const message = JSON.stringify({ deviceId, ts, loc, temp });

  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

//chosen device
client.on('message', (topic, message) => {
  if (topic == '/chosenDevice') {
    const data = JSON.parse(message);
    
    CDevice.findOne({name: "a" }, (err, device) => {
      if (err) {
        console.log(err)
      }
        const { chosenDevice } = device;
        const { name } = data;
  
        chosenDevice.push({ name });
        device.chosenDevice = chosenDevice;

        device.save(err => {
          if (err) {
            console.log(err)
          }
        });
    });
  }
});

app.post('/choose-device', (req, res) => {
  const { name }  = req.body;

  const topic = `/chosenDevice`;
  const message = JSON.stringify({ name });

  client.publish(topic, message, () => {
    res.send('published new message');
  });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});