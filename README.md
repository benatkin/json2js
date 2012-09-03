Converts JSON with function source to a CommonJS module with function
expressions.

Goes with [js2json][js2json] to support modifying CouchApp design
documents in a single file.

## synopsis

example.json:

```
{
  "hello": "function() {\n  /* a comment */\n  console.log('Hello, world.');\n}"
}
```

run-example.js:

``` javascript
var json2js = require('json2js')
  , fs = require('fs')
  , jsonValue = JSON.parse(fs.readFileSync('./example.json', 'utf8'))
  , js = json2js.convert(jsonValue);
console.log(js);
```

output:

```
module.exports = {
  "hello": function() {
    /* a comment */
    console.log('Hello, world.');
  }
}
```

## License (MIT)

Copyright (C) 2012 Ben Atkin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[js2json]: https://npmjs.org/package/js2json
