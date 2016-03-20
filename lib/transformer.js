'use strict';

const async = require('async');
class Transformer {
  constructor() {
    this.transforms = [];
  }

  addTransform(fn, options) {
    this.transforms.push({
      method: fn,
      options: options || {}
    });
  }

  process(fileObj, allDone) {
    async.eachSeries(this.transforms, (transform, done) => {
      if (transform.options.enabled === false) {
        return done(null, fileObj);
      }
      transform.method(fileObj, transform.options, done);
    }, (err) => {
      if (err) {
        allDone(err);
      }
      allDone(null, fileObj);
    });
  }
}

module.exports = Transformer;
