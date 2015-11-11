module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js',
            'bower_components/modernizr/modernizr.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'bower_components/ngDialog/js/ngDialog.js',
            'bower_components/angular-base64/angular-base64.js',
            'bower_components/angular-google-places-autocomplete/dist/autocomplete.min.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/angular-base64-upload/src/angular-base64-upload.js',
            'bower_components/spin.js/spin.min.js',
            'bower_components/angular-spinner/angular-spinner.js',
            'bower_components/angular-utils-pagination/dirPagination.js',
            'bower_components/angular-ui-bootstrap-datetimepicker/datetimepicker.js',
            'bower_components/moment/moment.js',
            'bower_components/intro.js/minified/intro.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'app/scripts/app.js',
            'app/scripts/services/*.js',
            'app/scripts/controllers/LoginController.js',
            'tests/**/*.js'
        ],
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers: ['Chrome', 'Firefox'],
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ]
    });
};
