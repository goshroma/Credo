const path = require('path');
const NGOEvent = require(path.join(__dirname, '..', 'Models', 'NGOEvent'));
const Volunteer = require(path.join(__dirname, '..', 'Models', 'Volunteer'));
const User = require(path.join(__dirname, '..', 'Models', 'User'));

module.exports = {
  NGOEvent,
  Volunteer,
  User
}