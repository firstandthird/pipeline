const CleanCSS = require('clean-css');
module.exports = function(fileObj, options, done) {
  if (options.enabled !== false) {
    const out = new CleanCSS().minify(fileObj.contents).styles;
    fileObj.contents = out;
  }
  done(null, fileObj);
};
