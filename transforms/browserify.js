'use strict';
const browserify = require('browserify');
const stream = require('stream');
const babelify = require.resolve('babelify');

module.exports = function(fileObj, options, done) {
  if (options.ignore && fileObj.filepath.match(options.ignore)) {
    return done(null, fileObj);
  }
  const s = new stream.Readable();
  s._read = function noop() {};
  s.push(fileObj.contents);
  s.push(null);

  const b = browserify(s, {
    basedir: fileObj.dirname
  });

  const bundle = b
    .transform(babelify, { presets: [
      'es2015'
    ] })
    .bundle();

  let string = '';
  bundle.on('readable', (buffer) => {
    const part = bundle.read();
    if (part) {
      string += part.toString();
    }
  });

  bundle.on('end', () => {
    fileObj.contents = string;
    done(null, fileObj);
  });
};
