// Gulp Dependencies
var gulp = require('gulp');
var karmaServer = require('karma').Server;
var browserify = require('browserify');
var source = require('vinyl-source-stream');


// Run test once and exit
gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done()).start();
});


// Watch for file changes and re-run tests on each change
gulp.task('tdd', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done()).start();
});


// Bundle js files
gulp.task('bundle', function() {
    return browserify('./src/utils/utils.js').bundle()
        // vinyl-source-stream makes the bundle compatible with gulp
        .pipe(source('bundle.js')) // Desired filename
        // Output the file
        .pipe(gulp.dest('./dist/'));
});


gulp.task('default', ['tdd']);
