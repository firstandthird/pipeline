/* eslint-disable no-console */
'use strict';

const DefaultPipeline = require('../lib/default-pipeline');


const pipeline = new DefaultPipeline();

pipeline.process(process.argv[2], (err, results) => {
  if (err) {
    console.log(JSON.stringify(err, null, '  '));
    process.exit(1);
  }
  console.log(JSON.stringify(results, null, '  '));
});
