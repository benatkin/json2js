module.exports = {
  "init": function() {
    this.read_file_sync = require('fs').readFileSync;
    var json2js = require('./');
    this.convert = json2js.convert.bind(json2js);
    this.write = process.stdout.write.bind(process.stdout);
    this.args = process.argv.slice(2);
  },
  "parse": function() {
    this.input_file = this.args[0];
    if (this.args.length == 1) {
      delete this['args'];
    } else if (this.args.length == 0) {
      this.error = 'No filename given.';
    } else {
      this.error = 'Too many arguments.';
    }
  },
  "run": function() {
    this.input_text = this.read_file_sync(this.input_file);
    this.output_text = this.convert(this.input_text);
    this.write(this.output_text);
  },
  "usage": function() {
    this.write('error: ' + this.error + "\n\n" + 'usage: json2js input-file' + "\n");
  },
  "exec": function() {
    this.init();
    this.parse();
    if (typeof this.error == 'undefined') {
      this.run();
    } else {
      this.usage();
    }
  }
}
