const path = require('path');
const NGOEvent = require(path.join(__dirname, '..', 'models', 'NGOEvent'));
const Volunteer = require(path.join(__dirname, '..', 'models', 'Volunteer'));
const User = require(path.join(__dirname, '..', 'models', 'User'));

module.exports = {
  NGOEvent,
  Volunteer,
  User
};