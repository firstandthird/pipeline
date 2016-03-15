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
