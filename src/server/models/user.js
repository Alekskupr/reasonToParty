const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  login: String,
  password: String,
  subscription: Boolean,
  favoriteHolidays: Array,
});

module.exports = mongoose.model('User', userSchema);
