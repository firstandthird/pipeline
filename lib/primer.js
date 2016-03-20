'use strict';
const async = require('async');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');
class Primer {
  constructor(pipeline) {
    this.pipeline = pipeline;
  }

  process(options, allDone) {
    //options: { files: [], dist: '/public/_dist', mapping: 'mapping.json', assetpath: /ui }
    const mapping = {};
    async.each(options.files, (file, done) => {

      async.waterfall([
        //process each file
        (next) => {
          this.pipeline.process(file, next);
        },
        //get new path
        (fileObj, next) => {
          const fileNameNoExt = path.basename(fileObj.filename, fileObj.ext);
          let newFileName = '';
          if (fileObj.hash) {
            newFileName = `${fileNameNoExt}.${fileObj.hash}${fileObj.mimeExt}`;
          } else {
            newFileName = `${fileNameNoExt}${fileObj.mimeExt}`;
          }
          const newRelative = path.join(fileObj.relativePath, newFileName);
          fileObj.primedFile = path.join(options.dist, newRelative);
          fileObj.primedPath = path.dirname(fileObj.primedFile);
          fileObj.primedRelative = newRelative;
          next(null, fileObj);
        },
        //create directory
        (fileObj, next) => {
          mkdirp(fileObj.primedPath, (err) => {
            next(err, fileObj);
          });
        },
        //write file to disk
        (fileObj, next) => {
          fs.writeFile(fileObj.primedFile, fileObj.contents, (err) => {
            next(err, fileObj);
          });
        },
        //add to mapping obj
        (fileObj, next) => {
          mapping[fileObj.relativeFile] = fileObj.primedRelative;
          next(null, fileObj);
        }
      ], done);
    }, (err) => {
      if (err) {
        return allDone(err);
      }
      //write mapping file to disk

      const mappingContents = JSON.stringify(mapping);
      fs.writeFile(options.mapping, mappingContents, (mappingErr) => {
        if (mappingErr) {
          return allDone(mappingErr);
        }
        allDone(null, mapping);
      });
    });
  }
}

module.exports = Primer;
