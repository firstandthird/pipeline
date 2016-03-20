const crypto = require('crypto');
module.exports = function(fileObj, options, done) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(fileObj.contents, 'utf8');
  const hash = md5sum.digest('hex');

  fileObj.hash = hash.substr(0, 8);
  done(null, fileObj);
};
