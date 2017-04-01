var gulp = require('gulp'),
	sass = require('gulp-sass'), // 需要先用cnpm安装node-sass
	uglify = require('gulp-uglify'),
	html = require('gulp-htmlmin'),
	assetRev = require('gulp-asset-rev'), // 添加版本号，需要在原文件中修改
	autoPrefixer = require('gulp-autoprefixer'); // 增加内核前缀

gulp.task('sassTocss', function() {
	return gulp.src('main.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoPrefixer({
			browsers:['last 10 versions', 'Firefox >= 10'],
			cascade: true,
		}))
		.pipe(assetRev())
		.pipe(gulp.dest('publish'))
})

gulp.task('js', function() {
	return gulp.src(['main.js'])
		.pipe(uglify())
		.pipe(assetRev())
		.pipe(gulp.dest('publish'))
})

gulp.task('htmlmin', function() {
	return gulp.src('index.html')
		.pipe(html({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(assetRev())
		.pipe(gulp.dest('publish'));
})

gulp.task('default', function() {
	gulp.run('js', 'sassTocss', 'htmlmin');

	gulp.watch('./main.scss', function() {
		gulp.run('sassTocss');
	})

	gulp.watch('./main.js', function() {
		gulp.run('js');
	})

	gulp.watch('./index.html', function() {
		gulp.run('htmlmin');
	})
})