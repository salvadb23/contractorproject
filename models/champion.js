const mongoose = require('mongoose');
const Champion = mongoose.model('Champion', {
  Champion: String,
  Description: String,
  Passive: String,
  Ability1: String,
  Ability2: String,
  Ability3: String,
  Ultimate: String,
});
module.exports = Champion;