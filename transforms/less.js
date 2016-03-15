const less = require('less');

module.exports = function(fileObj, options, done) {
  options = options || {};
  options.plugins = [
    require('less-plugin-glob')
  ];
  less.render(fileObj.contents, options, (err, results) => {
    if (err) {
      return done(err);
    }

    fileObj.contents = results.css;
    done(null, fileObj);
  });
};
