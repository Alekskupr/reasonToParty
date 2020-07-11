const mongoose = require('mongoose');

const AboutMeSchema = new mongoose.Schema({
  aboutMe: String,
  resume: Buffer,
});

module.exports = mongoose.model('AboutMeSchema', AboutMeSchema);
