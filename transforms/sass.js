const sass = require('node-sass');
const _ = require('lodash');

module.exports = function(fileObj, options, done) {
  options = options || {};
  const clone = _.cloneDeep(options);
  clone.data = fileObj.contents;
  sass.render(clone, (err, results) => {
    if (err) {
      return done(err);
    }
    fileObj.contents = results.css.toString();
    done(null, fileObj);
  });
};
