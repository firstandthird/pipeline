'use strict';
const async = require('async');
const path = require('path');
const fs = require('fs');

const regex = new RegExp('^\/\/include: (.*?)$', 'gm');

const tryRead = function(paths, file, done) {
  let index = 0;
  const filePaths = paths.map((p) => {
    return path.resolve(p, file);
  });

  const check = function() {
    if (filePaths.length === (index - 1)) {
      return done(new Error(`${file} not found`));
    }

    fs.exists(filePaths[index], (exists) => {
      if (!exists) {
        index++;
        return check();
      }

      fs.readFile(filePaths[index], 'utf8', done);
    });
  };
  check();
};

module.exports = function(fileObj, options, allDone) {
  const files = [];
  let match;
  while ((match = regex.exec(fileObj.contents)) !== null) {
    files.push(match[1]);
  }

  if (files.length === 0) {
    return allDone(null, fileObj);
  }

  async.map(files, (file, done) => {
    tryRead(options.paths, file, (err, contents) => {
      done(err, contents);
    });
  }, (err, results) => {
    if (err) {
      return allDone(err);
    }
    const inject = results.join('');

    fileObj.contents = inject + fileObj.contents;
    allDone(null, fileObj);
  });
};
