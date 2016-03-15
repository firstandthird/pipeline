const UglifyJS = require('uglify-js');
module.exports = function(fileObj, options, done) {
  if (options.enabled !== false) {
    const out = UglifyJS.minify(fileObj.contents, { fromString: true });
    fileObj.contents = out.code;
    done(null, fileObj);
  } else {
    done(null, fileObj);
  }
};
