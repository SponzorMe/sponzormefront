module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'dist/scripts/vendor.js',
            'dist/scripts/main.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'tests/**/*.js'
        ],
        preprocessors:{
          'dist/scripts/*.js': 'coverage'
        },
        singleRun : true,
        autowatch : false,
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        reporters: ['progress', 'html', 'coverage'],
        coverageReporter:{
          type : 'html',
          dir : 'test-reports/'
        },
        htmlReporter: {
          outputFile: 'test-reports/units.html',

          // Optional
          pageTitle: 'Unit Tests',
          subPageTitle: 'A sample project description'
        }
    });
};
