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

// Specify the location of the files we want to watch, and where to dump the results
var src = {
    css: 'css/',
    js: 'js/scripts.js',
    scss: 'css/sass/**/*.scss',
    templates: '**/*.mustache'
}

var dest = {
    css: '../public/css/',
    js: '../public/js/',
    scss: '../public/css/',
}

/**
 * Gulp task: BrowserSync [default]
 * Sets up the proxied BrowserSync server, watches our files for changes
 */
gulp.task( 'default', null, function() {

    // Create the BrowserSync proxy
    browserSync( {
        notify: false,
        open: false,
        proxy: 'http://patternlab-adamnorwood.dev'
    } );

    // Watch our files for changes, run tasks when something happens...
    gulp.watch( src.scss, ['sass'] );
    gulp.watch( src.js, ['js'] );
    gulp.watch( src.templates, ['patternlab'] );

} );


/**
 * Gulp task: Sass
 * Processes our Sass .scss files into CSS, and also handles creation
 * of CSS sourcemaps for better dev tools debugging
 */
gulp.task( 'sass', function() {

    return gulp.src( src.scss )
        .pipe( sourcemaps.init() )
        .pipe( sass( {
            outputStyle: 'compressed',
            errLogToConsole: true
        } ) )
        .pipe( autoprefixer() )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( 'css/' ) )
        .pipe( gulp.dest( '../public/css/' ) )
        .pipe( browserSync.stream( { match: '**/*.css' } ) );

} );


/**
 * Gulp task: JavaScript
 * Concatenates our set of JS files into one scripts.js file, uglifies (compresses)
 * that file, and generates appropriate sourcemaps for better debugging.
 */
gulp.task( 'js', function() {

    return gulp.src( src.js )
        .pipe( sourcemaps.init() )
        .pipe( concat( 'scripts.js' ) )
        .pipe( uglify( { preserveComments: 'some' } ) )
        .pipe( rename( 'scripts.min.js' ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( dest.js ) )
        .pipe( browserSync.reload( { stream: true } ) );

} );


/**
 * Gulp task: Pattern Lab
 * Runs the Pattern Lab builder after a .mustache file has been updated
 */
gulp.task( 'patternlab', function( cb ) {

    exec( 'php ../core/builder.php -g', function ( err, stdout, stderr ) {
        console.log( stdout );
        console.log( stderr );
        cb( err );
        browserSync.reload();
    } );

} );