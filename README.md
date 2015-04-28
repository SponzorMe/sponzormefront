# sponzormefront
SponzorMe front-end.

Paths configuration are stored in `gulpfile.js`. Change `options.(src|dist|tmp|e2e)` in `gulpfile.js` if you want to config paths after the app is generated.

**Warning**: The paths are also written in the `index.html` for the build with useref. If you want to change these paths, you also have to change the paths there in order to have the build task working.

### Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

More information on the gulp tasks in [this README.md](app/templates/gulp/README.md).

## Directory structure

[Best Practice Recommendations for Angular App Structure](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

The root directory generated for a app with name `gulpAngular` :
<pre>
├──  src/
│   ├──  app/
│   │   ├──  components/
│   │   │   └──  navbar/
│   │   │   │   ├──  navbar.controller.js
│   │   │   │   └──  navbar.html
│   │   ├──  main/
│   │   │   ├──  main.controller.js
│   │   │   ├──  main.controller.spec.js
│   │   │   └──  main.html
│   │   └──  index.js
│   │   └──  index.(css|less|scss)
│   │   └──  vendor.(css|less|scss)
│   ├──  assets/
│   │   └──  images/
│   ├──  404.html
│   ├──  favico.ico
│   └──  index.html
├──  gulp/
├──  e2e/
├──  bower_components/
├──  nodes_modules/
├──  .bowerrc
├──  .editorconfig
├──  .gitignore
├──  .jshintrc
├──  bower.json
├──  gulpfile.js
├──  karma.conf.js
├──  package.json
├──  protractor.conf.js
</pre>

## Features included in the gulpfile
* *useref* : allow configuration of your files in comments of your HTML file
* *ngAnnotate* : convert simple injection to complete syntax to be minification proof
* *uglify* : optimize all your JavaScript
* *csso* : optimize all your CSS
* *rev* : add a hash in the file names to prevent browser cache problems
* *watch* : watch your source files and recompile them automatically
* *jshint* : JavaScript code linter
* *imagemin* : all your images will be optimized at build
* *Unit test (karma)* : out of the box unit test configuration with karma
* *e2e test (protractor)* : out of the box e2e test configuration with protractor
* *browser sync* : full-featured development web server with livereload and devices sync
* *angular-templatecache* : all HTML partials will be converted to JS to be bundled in the application
* **TODO** lazy : don't process files which haven't changed when possible
