/* global describe, it */
'use strict';
const expect = require('chai').expect;
const readFile = require('../lib/read-file');

describe('readFile', () => {
  it('should read file and return object', (done) => {
    readFile(`${__dirname}/fixtures/test.js`, (err, fileObj) => {
      expect(err).to.equal(null);
      expect(fileObj).to.deep.equal({
        contents: 'const add = function(a, b) {\n  return a + b;\n};\n\nconst result = add(1, 3);\n\nconsole.log(result);\n\n',
        dirname: `${__dirname}/fixtures`,
        ext: '.js',
        filename: 'test.js',
        filepath: `${__dirname}/fixtures/test.js`
      });
      done();
    });
  });
  it('should error if file doesnt exist', (done) => {
    readFile(`${__dirname}/fixtures/test2.js`, (err, fileObj) => {
      expect(err).to.not.equal(null);
      expect(fileObj).to.equal(undefined);
      done();
    });
  });
});
