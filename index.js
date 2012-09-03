module.exports = {
  "init": function() {
    this._ready = true;
    return this;
  },
  "convert": function(jsonValue) {
    var result = JSON.stringify(jsonValue, null, 2);
    if (! this._ready) {
      this.init();
    }
    result = this.replaceFunctions(result, jsonValue, 0);
    return "module.exports = " + result;
  },
  "replaceFunctions": function(input, jsonValue, level) {
    var re = /^function\s*\([^)]*\)\s*{/;
    var result = input;
    var i, key, value;
    if (typeof jsonValue == 'string' && re.test(jsonValue)) {
      return result.replace(JSON.stringify(jsonValue), this.prepareFunction(jsonValue, level));
    } else if (typeof jsonValue == 'object') {
      if (jsonValue.constructor.name == 'Array') {
        for (i = 0; i < jsonValue.length; i++) {
          value = jsonValue[i];
          if (typeof value == 'object' || (typeof value == 'string' && re.test(value))) {
            result = this.replaceFunctions(result, value, level + 1);
          }
        }
        return result;
      } else {
        for (key in jsonValue) {
          value = jsonValue[key];
          if (typeof value == 'object' || (typeof value == 'string' && re.test(value))) {
            result = this.replaceFunctions(result, value, level + 1);
          }
        }
        return result;
      }
    } else {
      return result;
    }
  },
  "prepareFunction": function(functionSource, level) {
    var lines = functionSource.split("\n");
    var i, j;
    if (lines.length >= 3) {
      for (i = 1; i < lines.length; i++) {
        for (j=0; j < level; j++) {
          lines[i] = '  ' + lines[i];
        }
      }
      return lines.join("\n");
    } else {
      return functionSource;
    }
  }
}
