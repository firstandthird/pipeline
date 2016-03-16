'use strict';
const Pipeline = require('./pipeline');
const Transformer = require('./transformer');

const uglifyTransform = require('../transforms/uglify');
const browserifyTransform = require('../transforms/browserify');
const lessTransform = require('../transforms/less');
const autoPrefixTransform = require('../transforms/autoprefix');
const sassTransform = require('../transforms/sass');
const cssCleanTransform = require('../transforms/css-clean');

class DefaultPipeline {
  constructor(options) {
    this.options = options || {};

    this.pipeline = new Pipeline();

    this.pipeline.addExtension({
      ext: '.js',
      mime: 'application/javascript',
      transformer: this._createScriptTransformer()
    });

    this.pipeline.addExtension({
      ext: '.less',
      mime: 'text/css',
      transformer: this._createLessTransformer()
    });

    this.pipeline.addExtension({
      ext: '.scss',
      mime: 'text/css',
      transformer: this._createSassTransformer()
    });
  }

  _createScriptTransformer() {
    const transformer = new Transformer();
    transformer.addTransform(browserifyTransform, this.options.browserify);
    transformer.addTransform(uglifyTransform, this.options.uglify);

    return transformer;
  }

  _createLessTransformer() {
    const transformer = new Transformer();
    transformer.addTransform(lessTransform, this.options.less);
    transformer.addTransform(autoPrefixTransform, this.options.autoprefixer);
    transformer.addTransform(cssCleanTransform, this.options.cssClean);

    return transformer;
  }

  _createSassTransformer() {
    const transformer = new Transformer();
    transformer.addTransform(sassTransform, this.options.sass);
    transformer.addTransform(autoPrefixTransform, this.options.autoprefixer);
    transformer.addTransform(cssCleanTransform, this.options.cssClean);

    return transformer;
  }
  
  hasExtension(ext) {
    return this.pipeline.hasExtension(ext);
  }

  process(filepath, done) {
    this.pipeline.process(filepath, done);
  }
}

module.exports = DefaultPipeline;
