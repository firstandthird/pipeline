const fs = require('fs');
const path = require('path');

module.exports = function(filepath, options, done) {
  options = options || {};
  fs.readFile(filepath, 'utf8', (err, src) => {
    if (err) {
      return done(err);
    }
    const filename = path.basename(filepath);
    const dirname = path.dirname(filepath);
    const ext = path.extname(filepath);
    const relativePath = (options.basePath) ? dirname.replace(`${options.basePath}/`, '') : dirname;
    const relativeFile = path.join(relativePath, filename);
    done(null, {
      filepath,
      filename,
      ext,
      dirname,
      relativePath,
      relativeFile,
      contents: src
    });
  });
};
