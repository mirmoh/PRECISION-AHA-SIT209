const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({

  name:{
    type: String,
    required: true,
},
user:{
    type: String,
    required: true
},
sensorData: {
    type: Array,
},
id: {
  type: String,
}
}, { collection : 'device209' }));
