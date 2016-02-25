"use strict";

var Validator3500 = require("../../src/Validator3500");
var shared = require("./shared");
var expect = require("chai").expect;

describe("Validator (3500 edition)", function() {
  describe(".validate", function() {
    context("on firstName", function() {
      before(function() {
        this.ruleKey = "first_name";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeLongerThan(20);

      shared.itCanBeAsLongAs(20);
      shared.itCanHaveThisValue("Gabriel");
    });

    context("on lastName", function() {
      before(function() {
        this.ruleKey = "last_name";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeLongerThan(30);

      shared.itCanBeAsLongAs(30);
      shared.itCanHaveThisValue("Gabriel");
    });

    context("on unicodeFirstName", function() {
      before(function() {
        this.ruleKey = "unicode_first_name";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeLongerThan(100);

      shared.itCanBeAsLongAs(100);
      shared.itCanHaveThisValue("Gabriel-さん");
    });

    context("on unicodeLastName", function() {
      before(function() {
        this.ruleKey = "unicode_last_name";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeLongerThan(100);

      shared.itCanBeAsLongAs(100);
      shared.itCanHaveThisValue("Gabriel-さん");
    });

    context("on dateOfBirth", function() {
      before(function() {
        this.ruleKey = "date_of_birth";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeAnInvalidDate();
      shared.itCannotBeUnder18Years();

      it("returns true if the date is valid", function() {
        var currentYear = new Date().getFullYear();
        var dateOfBirth = (currentYear - 25) + "-01-01";
        expect(Validator3500.validate(this.ruleKey, dateOfBirth)).to.be.true;
      });
    });

    context("on gender", function() {
      before(function() {
        this.ruleKey = "gender";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeLongerThan(1);
      shared.itCannotBeOneOfThoseValues(["A", "B", "C"]);

      shared.itCanBeOneOfThoseValues(["M", "F"]);
    });

    context("on email", function() {
      before(function() {
        this.ruleKey = "email";
      });

      shared.itCannotBeUndefined();
      shared.itCannotBeEmpty();
      shared.itCannotBeBlank();
      shared.itCannotBeOneOfThoseValues([
        "bad email@gmail.com",
        "no@dot-com",
        ]);

      shared.itCanBeOneOfThoseValues([
        "t@a.com",
        "foobar@yopmail.com",
        "sydney+bristow@alias.com",
        ]);
    });
  });
});
