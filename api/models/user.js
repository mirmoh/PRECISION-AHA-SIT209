const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
  id: String,
  email: String,
  phone: String,
  password: String
}, { collection : 'user209', timestamps: true }));

// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   email: {
//     type: String
//   },
//   password: {
//     type: String
//   }
// }, {timestamps: true})

// const User = mongoose.model('User', userSchema)
// module.exports = User