'use strict';

const readFile = require('./read-file');

class Pipeline {
  constructor(options) {
    this.options = options || {};
    this.extensions = {};
  }

  addExtension(obj) {
    this.extensions[obj.ext] = obj;
  }

  hasExtension(ext) {
    return (this.extensions[ext]);
  }

  process(filepath, allDone) {
    const options = {
      basePath: this.options.basePath
    };
    readFile(filepath, options, (err, fileObj) => {
      if (err) {
        return allDone(err);
      }

      const extension = this.extensions[fileObj.ext];

      fileObj.mime = extension.mime;
      fileObj.mimeExt = extension.mimeExt;

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
