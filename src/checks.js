"use strict";

var moment = require("moment");

var checks = {};

checks.accepts = function(value, valuesAccepted) {
  return valuesAccepted.indexOf(value) !== -1;
};
checks.date_format = function(value, dateFormat) {
  var date = moment(value, dateFormat);
  return date.isValid();
};
checks.fn = function(value, fn) {
  return fn(value);
};
checks.max_length = function(value, maxLenght) {
  return value.length <= maxLenght;
};
checks.regex = function(value, regex) {
  return regex.test(value);
};

module.exports = checks;
