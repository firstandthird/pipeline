const fs = require('fs');
const path = require('path');

module.exports = function(filepath, done) {
  fs.readFile(filepath, 'utf8', (err, src) => {
    if (err) {
      return done(err);
    }
    done(null, {
      filepath,
      filename: path.basename(filepath),
      ext: path.extname(filepath),
      dirname: path.dirname(filepath),
      contents: src
    });
  });
};
