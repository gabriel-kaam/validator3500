"use strict";

var relative = require('require-relative');
var moment = require("moment");
var checks = require("./checks.js");

var Validator3500 = {};

function stringIsEmpty(string) {
  return !string || string.trim() === "";
}

function valueCompliesWithTheRule(value, ruleName, ruleValue) {
  var check = checks[ruleName];
  if (!check) {
    throw new Error("I don't know how to handle this type of rule ('" + ruleName + "')");
  }
  return check(value, ruleValue);
}

function valueCompliesWithTheRules(value, rules) {
  return Object.keys(rules).every(function(key) {
    return valueCompliesWithTheRule(value, key, rules[key]);
  });
}

Validator3500.rules = {
  first_name : {
    max_length : 20,
  },
  last_name : {
    max_length : 30,
  },
  unicode_first_name : {
    max_length : 100,
  },
  unicode_last_name : {
    max_length : 100,
  },
  date_of_birth : {
    date_format : "YYYY-MM-DD",
    fn : function(value) {
      var dateOfBirthMoment = moment(value, "YYYY-MM-DD");
      var now = moment();
      return now.diff(dateOfBirthMoment, "years") >= 18;
    },
  },
  gender : {
    accepts : ["M", "F"],
  },
  email : {
    regex : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
};

Validator3500.validate = function(ruleKey, value) {
  if (stringIsEmpty(value)) {
    return false;
  }

  var rules = Validator3500.rules[ruleKey];
  return rules && valueCompliesWithTheRules(value, rules);
};

module.exports = Validator3500;
