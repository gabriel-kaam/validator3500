"use strict";

var Validator3500 = require("../../src/Validator3500");
var expect = require("chai").expect;
var sharedExamples = {};

function generateLongString(length) {
  return "f" + Array(length - 1).join('u') + "!";
}

sharedExamples.itCannotBeUndefined = function() {
  it("returns false if undefined", function() {
    var undefinedString = undefined;
    expect(Validator3500.validate(this.ruleKey, undefinedString)).to.be.false;
  })
};
sharedExamples.itCannotBeEmpty = function() {
  it("returns false if empty ('')", function() {
    var emptyString = "";
    expect(Validator3500.validate(this.ruleKey, emptyString)).to.be.false;
  });
};
sharedExamples.itCannotBeBlank = function() {
  it("returns false if only blank characters ('    ')", function() {
    var blankString = "      ";
    expect(Validator3500.validate(this.ruleKey, blankString)).to.be.false;
  });
};
sharedExamples.itCannotBeLongerThan = function(maxLength) {
  it("returns false if length is > " + maxLength, function() {
    var longString = generateLongString(maxLength + 1);
    expect(Validator3500.validate(this.ruleKey, longString)).to.be.false;
  });
};
sharedExamples.itCannotBeAnInvalidDate = function() {
  it("returns false if is a invalid date", function() {
    var invalidDate = "not a real date";
    expect(Validator3500.validate(this.ruleKey, invalidDate)).to.be.false;
  });
};
sharedExamples.itCannotBeUnder18Years = function() {
  it("returns false if is under 18", function() {
    var currentYear = new Date().getFullYear();
    var underAgeDateOfBirth = (currentYear - 15) + "-01-01";
    expect(Validator3500.validate(this.ruleKey, underAgeDateOfBirth)).to.be.false;
  });
};
sharedExamples.itCannotHaveThisValue = function(invalidString) {
  it("returns false because '" + invalidString + "' is a not a valid string", function() {
    expect(Validator3500.validate(this.ruleKey, invalidString)).to.be.false;
  });
};
sharedExamples.itCannotBeOneOfThoseValues = function(invalidStrings) {
  invalidStrings.map(function(invalidString) {
    sharedExamples.itCannotHaveThisValue(invalidString);
  });
};

sharedExamples.itCanBeAsLongAs = function(length) {
  it("returns true if length == " + length, function() {
    var notThatLongString = generateLongString(length);
    expect(Validator3500.validate(this.ruleKey, notThatLongString)).to.be.true;
  });
};
sharedExamples.itCanHaveThisValue = function(validString) {
  it("returns true because '" + validString + "' is a valid string", function() {
    expect(Validator3500.validate(this.ruleKey, validString)).to.be.true;
  });
};
sharedExamples.itCanBeOneOfThoseValues = function(validStrings) {
  validStrings.map(function(validString) {
    sharedExamples.itCanHaveThisValue(validString)
  });
};

module.exports = sharedExamples;
