module.exports = {
  "init": function() {
    this._ready = true;
    this.falafel = require('falafel');
    return this;
  },
  "convert": function(json) {
    if (! this._ready) {
      this.init();
    }
    var js = "module.exports = " + json;
    var re = /^function\s*\([^)]*\)\s*{/;
    var root = this;
    var replaced = this.falafel(js, function(node) {
      if (node.type == 'Literal' && typeof node.value == 'string' && re.test(node.value)) {
        root.replaceFunction.call(root, node, js);
      }
    }).toString();
    return replaced;
  },
  "replaceFunction": function(node, js) {
    var lines = node.value.split("\n");
    if (lines.length >= 3) {
      var indent = this.findIndentation(node, js);
      for (var i = 1; i < lines.length; i++) {
        lines[i] = indent + lines[i];
      }
      node.update(lines.join("\n"));
    } else {
      node.update(node.value);
    }
  },
  "findIndentation": function(node, js) {
    var start, len, pos;
    for (start = node.range[0]; start >= 0; start--) {
      if (js[start] === "\n") {
        start += 1;
        break;
      }
    }
    len = 0;
    for (pos = start; pos < node.range[0]; pos++) {
      if (js[pos] === " ") {
        len += 1;
      } else {
        break;
      }
    }
    return js.substr(start, len);
  }
}
