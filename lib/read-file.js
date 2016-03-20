const fs = require('fs');
const path = require('path');

module.exports = function(filepath, options, done) {
  options = options || {};
  fs.readFile(filepath, 'utf8', (err, src) => {
    if (err) {
      return done(err);
    }
    const relativePath = (options.basePath) ? filepath.replace(`${options.basePath}/`, '') : filepath;
    done(null, {
      filepath,
      filename: path.basename(filepath),
      ext: path.extname(filepath),
      dirname: path.dirname(filepath),
      relativePath,
      contents: src
    });
  });
};
