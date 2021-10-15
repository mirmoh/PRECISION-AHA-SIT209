const mongoose = require('mongoose');

module.exports = mongoose.model('CDevice', new mongoose.Schema({
  id: String,
  name: String,
  user: String,
  chosenDevice: Array
}, { collection : 'cdevice209' }));