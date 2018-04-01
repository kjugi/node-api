const mongoose   = require('mongoose'),
      schemas    = require('../schemas'),
      UserSchema = new mongoose.Schema(schemas.UserSchema);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
