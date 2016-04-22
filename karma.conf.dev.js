module.exports = function(config) {
  config.set({
    basePath: './',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-base64/angular-base64.js',
      'bower_components/angular-google-places-autocomplete/dist/autocomplete.min.js',
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/spin.js/spin.min.js',
      'bower_components/angular-spinner/angular-spinner.js',
      'bower_components/angular-utils-pagination/dirPagination.js',
      'bower_components/moment/moment.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.min.js',
      'bower_components/textAngular/dist/textAngular-rangy.min.js',
      'bower_components/textAngular/dist/textAngular-sanitize.min.js',
      'bower_components/textAngular/dist/textAngular.min.js',
      'bower_components/angular-scroll-glue/src/scrollglue.js',
      'bower_components/aws-sdk/dist/aws-sdk.min.js',
      'bower_components/angular-input-stars-directive/angular-input-stars.js',
      'bower_components/downloadjs/download.min.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/app.modules.js',
      'app/app.constants.js',
      'app/app.enviroments.js',
      'app/app.directives.js',
      'app/app.routes.js',
      'app/app.run.js',
      'app/app.providers.js',
      'app/services/*.js',
      'tests/**/*.js'
    ],
    preprocessors: {
      'app/services/*.js': 'coverage'
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
    plugins:['karma-phantomjs-launcher'],
    htmlReporter: {
      outputFile: 'test-reports/units.html',
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description'
    }
  });
};
