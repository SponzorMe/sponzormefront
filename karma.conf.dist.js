module.exports = function(config) {
  config.set({
    basePath: './',
    files: [
      'dist/vendor.js',
      'dist/scripts.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'tests/**/*.js'
    ],
    preprocessors: {
      'dist/*.js': 'coverage'
    },
    singleRun: true,
    autowatch: false,
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress', 'html', 'coverage'],
    coverageReporter: {
      type: 'html',
      dir: 'test-reports/'
    },
    htmlReporter: {
      outputFile: 'test-reports/units.html',
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description'
    }
  });
};
