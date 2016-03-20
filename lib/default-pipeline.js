'use strict';
const Pipeline = require('./pipeline');
const Transformer = require('./transformer');

const uglifyTransform = require('../transforms/uglify');
const browserifyTransform = require('../transforms/browserify');
const lessTransform = require('../transforms/less');
const autoPrefixTransform = require('../transforms/autoprefix');
const sassTransform = require('../transforms/sass');
const cssCleanTransform = require('../transforms/css-clean');
const jsIncludeTransform = require('../transforms/js-include');

class DefaultPipeline extends Pipeline {
  constructor(options) {
    super(options);
    this.options = options || {};

    this.addExtension({
      ext: '.js',
      mimeExt: '.js',
      mime: 'application/javascript',
      transformer: this._createScriptTransformer()
    });

    this.addExtension({
      ext: '.less',
      mimeExt: '.css',
      mime: 'text/css',
      transformer: this._createLessTransformer()
    });

    this.addExtension({
      ext: '.scss',
      mimeExt: '.css',
      mime: 'text/css',
      transformer: this._createSassTransformer()
    });
  }

  _createScriptTransformer() {
    const transformer = new Transformer();
    transformer.addTransform(jsIncludeTransform, this.options.jsInclude);
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
    //transformer.addTransform(autoPrefixTransform, this.options.autoprefixer);
    //transformer.addTransform(cssCleanTransform, this.options.cssClean);

    return transformer;
  }
}

module.exports = DefaultPipeline;
