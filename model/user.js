// Model
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var mongoDB = 'mongodb://localhost:27017/LoginDB';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

// Create Schema
var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save();
    });
  });
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}
module.exports.getUserByUsername = function(username) {
  var query = {
    username: username
  };
  User.findOne(query);
}

module.exports.comparePassword = function(password, hash) {
  bcrypt.compare(password, hash, function(err, isMatch) {
        //callback(null, isMatch);
        return isMatch;
  });
}
