'use strict';

const readFile = require('./read-file');

class Pipeline {
  constructor(options) {
    this.extensions = {};
  }

  addExtension(obj) {
    this.extensions[obj.ext] = obj;
  }

  process(filepath, allDone) {
    readFile(filepath, (err, fileObj) => {
      if (err) {
        return allDone(err);
      }

      const extension = this.extensions[fileObj.ext];

      extension.transformer.process(fileObj, (transformErr, transformedFile) => {
        if (transformErr) {
          return allDone(transformErr);
        }

        allDone(null, transformedFile);
      });
    });
  }
}

module.exports = Pipeline;