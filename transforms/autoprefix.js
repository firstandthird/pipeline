const autoprefixer = require('autoprefixer');
const postcss = require('postcss');

module.exports = function(fileObj, options, done) {
  postcss([autoprefixer])
    .process(fileObj.contents)
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString());
      });
      fileObj.contents = result.css;
      done(null, fileObj);
    }, (err) => {
      done(err);
    });
};
