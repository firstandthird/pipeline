'use strict';

const readFile = require('./read-file');

class Pipeline {
  constructor(options) {
    this.extensions = {};
  }

  addExtension(obj) {
    this.extensions[obj.ext] = obj;
  }

  hasExtension(ext) {
    return (this.extensions[ext]);
  }

  process(filepath, allDone) {
    readFile(filepath, (err, fileObj) => {
      if (err) {
        return allDone(err);
      }

      const extension = this.extensions[fileObj.ext];

      fileObj.mime = extension.mime;

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
