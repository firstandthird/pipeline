/* global describe, it */
'use strict';
const expect = require('chai').expect;
const Transformer = require('../lib/transformer');

describe('Transformer', () => {
  describe('#addTransform', () => {
    it('should add to transforms array as an object of method and options', () => {
      const t = new Transformer();
      const trans = function() {
      };
      t.addTransform(trans, { option: 1 });
      expect(t.transforms[0].options).to.deep.equal({ option: 1 });
      expect(t.transforms[0].method).to.equal(trans);
    });
  });

  describe('process', () => {
    it('should pass fileObj to each transform', (allDone) => {
      const t = new Transformer();
      const fileObj = {
        filePath: 'some/path/name.txt',
        fileName: 'name.txt',
        extension: 'txt',
        contents: 'hi there'
      };
      const trans = function(fileObj2, options, done) {
        expect(fileObj2).to.deep.equal(fileObj);
        done(null, fileObj2);
      };
      t.addTransform(trans);
      t.process(fileObj, (err, results) => {
        expect(err).to.equal(null);
        expect(results).to.deep.equal(fileObj);
        allDone();
      });
    });

    it('should pass fileObj to each transform and allow modification', (allDone) => {
      const t = new Transformer();
      const fileObj = {
        filePath: 'some/path/name.txt',
        fileName: 'name.txt',
        extension: 'txt',
        contents: 'hi there'
      };
      const trans = function(fileObj2, options, done) {
        fileObj2.contents = 'hi there 2';
        done(null, fileObj2);
      };
      const trans2 = function(fileObj2, options, done) {
        expect(fileObj2.contents).to.equal('hi there 2');
        done(null, fileObj2);
      };
      t.addTransform(trans);
      t.addTransform(trans2);
      t.process(fileObj, (err, results) => {
        expect(err).to.equal(null);
        expect(results.contents).to.equal('hi there 2');
        allDone();
      });
    });
  });
});
