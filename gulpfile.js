/**
 * Polyfills
 */
require('es6-promise').polyfill();

/**
 * Plugins
 */
var clean = require('gulp-clean');
var mqpacker = require('css-mqpacker');
var cp = require('child_process');
var del = require('del');
var fs  = require('fs');
var gulp = require('gulp');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var svgSprite = require('gulp-svg-sprite');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
const { series } = require('gulp');
/**
 * Load Config Files
 */
var paths = require('./sdg-build/paths.json');
var scripts = require('./sdg-build/scripts.json');
var sprites = require('./sdg-build/sprites.json');
var stylesheets = require('./sdg-build/stylesheets.json');

/**
 * handle error
 */
function handleError(err) {
	util.log(err.toString());
	this.emit('end');
}

/**
 * clean sprite directory
 */
function cleanSpriteTask(key) {
	var taskName = key + 'SvgClean',
		fileName = paths.pub + 'sprite-' + key + '*.svg';

	gulp.task(taskName, function () {
		return gulp.src(fileName, {read: false})
			.pipe(clean());
	});
}



/**
 * create svg sprites
 */
const spriteTask = (key) => {
	let taskName = key + 'Svg',
		taskDir = sprites.dir + key + '/*',
		taskSassDest = sprites.scss + '_' + key + '.scss',
		taskFileName = 'sprite-' + key + '.svg',
		cleanTask = key + 'SvgClean';
	// ADDED gulp.series() to fix first task never defined error
	gulp.task(taskName, [cleanTask], function() {
		return gulp.src(taskDir)
		.pipe(svgSprite({
			shape: {
				dimension : {
					precision : 0,
					attributes : true
				},
				spacing : {
					padding : '4',
					box : 'content'
				}
			},
			mode: {
				css: {
					dest: '',
					layout: "vertical",
					bust: true,
					sprite: taskFileName,
					render: {
						scss: {
							dest: taskSassDest,
							template: sprites.tpl
						}
					},
					prefix : key + '--%s',
					recursive : true,
					example : false,
					common : key,
					mixin : key + '-svg'
				}
			}
		}))
		.on('error', handleError)
		.pipe(gulp.dest(paths.pub));
	});
};

/**
 * register sprite tasks
 */
var spriteTasks = [],
	cleanSpriteTasks = [],
	spritesList = sprites.list;

for (i = 0; i < spritesList.length; i++) {
	var val = spritesList[i];

	spriteTask(val);
	spriteTasks.push(val + 'Svg');
	cleanSpriteTask(val);
	cleanSpriteTasks.push(val + 'SvgClean');
}

/**
 * task to generate all sprites
 */
gulp.task('cleanSprites', cleanSpriteTasks);
gulp.task('sprites', function(callback) {
	runSequence(cleanSpriteTasks, spriteTasks, callback);
});

/**
 * sass task
 */
function sassTask(key) {
	var taskName = key + 'Sass',
		taskDir = paths.scss + key + '.scss';

	gulp.task(taskName,function() {
		return gulp.src(taskDir)
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'expanded'}))
			.on('error', handleError)
			.pipe(prefix('safari >= 6', 'ie >= 9', 'opera >= 12.1', 'ios >= 6', 'android >= 4'))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(paths.css));
	});
};


/**
 * combine media queries
 * @param  {String} key name of css file
 */
function sassMqPackTask(key) {
	var taskName = key + 'MqPack',
		taskDir = paths.css + key + '.css',
		results = '',
		pattern = /^\s*\.q\s*\{[^}]*\}/gm;

	gulp.task(taskName, [key + 'Sass'], function() {
		var css = fs.readFileSync(taskDir, 'utf8');
		var result = mqpacker.pack(css, {
			from: taskDir,
			to: taskDir
		});

		fs.writeFileSync(taskDir, result.css);

		return gulp.src(taskDir, {base: taskDir})
			.pipe(replace('"{{', '{{'))
			.pipe(replace('}}"', '}}'))
			.pipe(replace(pattern, ''))
			.pipe(gulp.dest(taskDir))
			.pipe(gulp.dest(paths.pub + key + '.scss.liquid'));
	});
};

/**
 * register sass tasks
 * @type {Array} comes from gulp-config.json
 */
var sassTasks = [],
	mqPackTasks = [],
	stylesheetList = stylesheets.list;

for (i=0;i<stylesheetList.length;i++) {

	var val = stylesheetList[i];

	sassTask(val);
	sassMqPackTask(val);
	sassTasks.push(val + 'Sass');
	mqPackTasks.push(val + 'MqPack');
}

/**
 * task to build css
 */
gulp.task('sass', mqPackTasks);

/**
 * minify js from assets dir
 * @param {String} key name of js file
 */
function jsMinifyTask(key) {
	var taskName = key + 'Minify',
		input = paths.pub + key + '.js';

	gulp.task(taskName, function() {
		return gulp.src(input)
			.pipe(uglify({
				mangle: true,
				output: {
					comments: false
				},
				compress: {
					drop_console: true,
					warnings: false
				}
			}))
			.on('error', handleError)
			.pipe(rename({ suffix : '.min'}))
			.pipe(gulp.dest(paths.pub));
	});
};

/**
 * register js tasks
 * @type {Array} comes from gulp-config.json
 */
var jsMinifyTasks = [];

for (var key in scripts) {
	var val;

	if (scripts.hasOwnProperty(key)) {
		val = scripts[key];
	}

	jsMinifyTask(key,val);
	jsMinifyTasks.push(key + 'Minify');
}

/**
 * js build task
 */
gulp.task('js', jsMinifyTasks);

/**
 * watch task
 */
gulp.task('watch', function() {
	var allMqPackTasks = [];
	var val = '';
	var dir = '';
	var file = '';

	/**
	 * sprites - register a watch task for each files in the sprites array
	 */
	Object.keys(sprites.list).forEach(function(key) {

		if (sprites.list.hasOwnProperty(key)) {
			val = sprites.list[key];
		}

		dir = sprites.dir + val + '/*';

		gulp.watch(dir, [val + 'Svg']).on('error', handleError);
	});

	/**
	 * styles - register a watch task for each files in the styles array
	 */
	stylesheets.list.forEach(function(styleSheet) {

		file = paths.scss + styleSheet + '.scss';
		dir = paths.scss + styleSheet + '/**/*';

		gulp.watch([file, dir], [styleSheet + 'MqPack']).on('error',handleError);

		// push MqPack tasks to array
		allMqPackTasks.push(styleSheet + 'MqPack');
	});

	/**
	 * scripts - register a watch task for each file in the scripts array
	 */
	Object.keys(scripts).forEach(function(key) {
		var task = key + 'Minify';

		file = paths.pub + key + '.js';
		dir = paths.pub + key + '*.js';

		gulp.watch([file, dir], [task]).on('error', handleError);
	});

	/**
	 * core - watch core sass files and rebuild all css if there's a change.
	 */
	gulp.watch([paths.scss + 'core/**/*.scss'], [allMqPackTasks])
		.on('error', handleError);
});

// Default Task
gulp.task('default', ['sprites', 'sass', 'js']);