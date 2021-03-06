// Pull in our required Gulp modules
var browserSync  = require( 'browser-sync' ),
    exec         = require( 'child_process' ).exec,
    gulp         = require( 'gulp' ),
    autoprefixer = require( 'gulp-autoprefixer' ),
    concat       = require( 'gulp-concat' ),
    rename       = require( 'gulp-rename' ),
    sass         = require( 'gulp-sass' ),
    sourcemaps   = require( 'gulp-sourcemaps' ),
    uglify       = require( 'gulp-uglify' );

// Change this if you're using the patternlab-node fork or something
// other than the stock PHP Pattern Lab generator...
var patternLabCommand = 'php ../core/builder.php -g';

// Specify the patterns of files to watch / compile
var globs = {
    sass:     'css/sass/**/*.scss',
    js:       ['js/scripts.js'],
    patterns: '**/*.mustache'
}

// Specify the locations to dump the compiled CSS and JS
var sourceDir = {
    css: 'css/',
    js:  'js/'
}

var publicDir = {
    css: '../public/css/',
    js:  '../public/js/'
}

/**
 * Gulp task: BrowserSync [default]
 * Sets up the proxied BrowserSync server, watches our files for changes
 */
gulp.task( 'default', null, function() {

    // Create the BrowserSync proxy
    browserSync( {
        notify: true,
        open: false,
        proxy: 'http://example.dev'
    } );

    // Watch our files for changes, run tasks when something happens...
    gulp.watch( globs.sass, ['sass'] );
    gulp.watch( globs.js, ['js'] );
    gulp.watch( globs.patterns, ['patternlab'] );

} );


/**
 * Gulp task: Sass
 * Processes our Sass .scss files into CSS, and also handles creation
 * of CSS sourcemaps for better dev tools debugging
 *
 * Note: gulp.dest() is used to drop copies of the generated files in both the
 * source/ and public/ directories -- otherwise the changes would be lost when
 * the Pattern Lab generator is run the next time...
 */
gulp.task( 'sass', function() {

    return gulp.src( globs.sass )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            outputStyle: 'compressed',
            errLogToConsole: true
        } ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( sourceDir.css ) )
        .pipe( gulp.dest( publicDir.css ) )
        .pipe( browserSync.stream( { match: '**/*.css' } ) );

} );


/**
 * Gulp task: JavaScript
 * Concatenates our set of JS files into one scripts.js file, uglifies (compresses)
 * that file, and generates appropriate sourcemaps for better debugging.
 *
 * Note: gulp.dest() is used to drop copies of the generated files in both the
 * source/ and public/ directories -- otherwise the changes would be lost when
 * the Pattern Lab generator is run the next time...
 */
gulp.task( 'js', function() {

    return gulp.src( globs.js )
        .pipe( sourcemaps.init() )
        .pipe( concat( 'scripts.js' ) )
        .pipe( uglify( { preserveComments: 'some' } ) )
        .pipe( rename( 'scripts.min.js' ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( sourceDir.js ) )
        .pipe( gulp.dest( publicDir.js ) )
        .pipe( browserSync.reload( { stream: true } ) );

} );


/**
 * Gulp task: Pattern Lab
 * Runs the Pattern Lab builder after a .mustache file has been updated
 */
gulp.task( 'patternlab', function( cb ) {

    exec( patternLabCommand, function ( err, stdout, stderr ) {
        console.log( stdout );
        console.log( stderr );
        cb( err );
        browserSync.reload();
    } );

} );