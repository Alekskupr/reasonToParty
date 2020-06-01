const mongoose = require('mongoose');

const EthnicCuisineSchema = new mongoose.Schema({
  countryCode: String,
  whatToDrink: Array,
  whatToEat: Array,
});

module.exports = mongoose.model('EthnicCuisine', EthnicCuisineSchema);
