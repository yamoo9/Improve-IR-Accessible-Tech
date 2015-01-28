// =========================================
// NPM Modules
// =========================================
var gulp         = require('gulp'),
	rename       = require('gulp-rename'),
	gulpif       = require('gulp-if'),

	concat       = require('gulp-concat'),
	concatCss    = require('gulp-concat-css'),
	uglify       = require('gulp-uglify'),
	minifyCss    = require('gulp-minify-css'),

	jade         = require('gulp-jade'),
	sass         = require('gulp-ruby-sass'),
	coffee       = require('gulp-coffee'),

	connect      = require('gulp-connect'),
	sourcemaps   = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify   = require('browserify'),
	source       = require('vinyl-source-stream');

// =========================================
// 환경 설정: Configuration
// =========================================
// 빌드 시, build=true gulp {테스크}
var env = Boolean(process.env.build) || false;

var config = {
	// 디렉토리 설정
	inputDir: 'src/',
	outputDir: 'build/',
	demoDir: 'demo/',
	// 컴파일 설정
	jade: {
		pretty: (env === true ? false : true)
	},
	sass: {
		lineNumbers: true,
		style: (env === true ? 'compressed' : 'expanded'),
		sourcemap: (env === true ? 'none' : 'auto')
	},
	coffee: {
		bare: (env === true ? false : true)
	},
	// 브라우저 프리픽스 설정
	autoprefixer: [
		'ie >= 10',
		'ie_mob >= 10',
		'ff >= 30',
		'chrome >= 34',
		'safari >= 7',
		'opera >= 23',
		'ios >= 7',
		'android >= 4.4',
		'bb >= 10'
	]
};

// =========================================
// 수행 일: Tasks
// =========================================
// 기본: DEFAULT
gulp.task('default', ['jade', 'sass', 'coffee', 'combine', 'connect', 'watch']);

// 조립: COMBINE
gulp.task('combine', ['combine:js', 'combine:css']);

// 관찰: WATCH
gulp.task('watch', function() {
	gulp.watch(config.inputDir+'**/*.jade', ['jade']);
	gulp.watch(config.inputDir+'**/*.sass', ['sass']);
	gulp.watch(config.inputDir+'**/*.coffee', ['coffee']);
});

// =========================================
// 커넥트 테스크 정의: Define Connect Task
// =========================================
gulp.task('connect', function() {
	return connect.server({
		root: config.demoDir,
		port: 8888,
		livereload: true
	});
});

// =========================================
// 컴바인 테스크 정의: Define Combine Task
// =========================================
// JS 합치기
gulp.task('combine:js', function() {
	return gulp.src( [config.inputDir+'js/libs/*.js', config.inputDir+'js/*.js'] )
		.pipe( gulpif(env === false, sourcemaps.init()) )
		.pipe(concat('improveIR.js'))
		.pipe( gulpif(env === false, sourcemaps.write()) )
		.pipe( gulp.dest( config.outputDir ) )
		//
		.pipe(rename({
			suffix: ''
		}))
		.pipe(gulp.dest( config.demoDir+'js' ))
		//
		.pipe( rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe( gulp.dest( config.outputDir ) )
		//
		.pipe(rename({
			suffix: ''
		}))
		.pipe(gulp.dest( config.demoDir+'js' ));
		//
});
// CSS 합치기
gulp.task('combine:css', function() {
	return gulp.src( config.inputDir+'css/**/*.css' )
		.pipe( gulpif(env === false, sourcemaps.init()) )
		.pipe(autoprefixer({
			browsers: config.autoprefixer
		}))
		.pipe(concat('style.css'))
		.pipe( gulpif(env === false, sourcemaps.write()) )
		.pipe( gulp.dest( config.outputDir ) )
		.pipe( rename({
			suffix: '.min'
		}))
		.pipe(minifyCss())
		.pipe( gulp.dest( config.outputDir ) );
});

// =========================================
// 컴파일 테스크 정의: Define Compile Task
// =========================================
// JADE
gulp.task('jade', function() {
	return gulp
		.src(config.inputDir+'jade/**/*.jade')
		.pipe(jade(config.jade))
		.pipe(gulp.dest( config.demoDir ))
		.pipe(connect.reload());
});
// SASS
gulp.task('sass', function() {
	return gulp
		.src(config.inputDir+'sass/**/*')
		.pipe(sass(config.sass))
		.pipe( gulpif(env === true, autoprefixer({ browsers: config.autoprefixer })) )
		.pipe(gulp.dest( config.demoDir+'css' ))
		.pipe(connect.reload());
});
// COFFEESCRIPT
gulp.task('coffee', function() {
	return gulp
		.src(config.inputDir+'coffee/**/*.coffee')
		.pipe( gulpif(env === false, sourcemaps.init()) )
		.pipe(coffee(config.coffee))
		.pipe( gulpif(env === false, sourcemaps.write()) )
		.pipe(gulp.dest( config.inputDir+'js' ))
		.pipe(connect.reload());
});
