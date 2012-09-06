module.exports = {
  "init": function() {
    this.assert = require('assert');
    this.js2json = require('js2json');
    this.json2js = require('./').init();
    this.values.example = JSON.stringify(this.values.example, null, 2);
    this.values.exampleFunction = this.values.exampleFunction.join("\n");
  },
  "values": {
    "example": {
      "hello": "function() {\n  /* a comment */\n  console.log('Hello, world.');\n}"
    },
    "exampleFunction": [
      "function() {",
      "  /* a comment */",
      "  console.log('Hello, world.');",
      "}"
    ]
  },
  "tests": {
    "convert": function() {
      var js = this.json2js.convert(this.values.example);
      this.assert.ok(!(/"function/.test(js)), 'has function string');
      this.assert.ok(js.indexOf('    console.log') != -1, 'must be indented four spaces');
      var json = this.js2json.convert(js);
      var jsonValue = JSON.parse(json);
      this.assert.equal(jsonValue.hello, this.values.exampleFunction);
    }
  },
  "run": function() {
    this.init();
    var passed = true;
    for (var key in this.tests) {
      try {
        this.tests[key].call(this);
        console.log(JSON.stringify(key) + ' passed');
      } catch (err) {
        console.log(JSON.stringify(key) + ' failed');
        console.log(err.stack);
        passed = false;
      }
    }
    process.exit(passed ? 0 : -1);
  }
}
