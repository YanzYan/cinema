var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint');


var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'common','minifycss'], function () {
  console.log('static项目的构件开始啦！');
});
//打包js文件
gulp.task('common', function(){
  console.log('打包controls/common/*.js -> controls/common.min.js');
  gulp.src([
      './src/js/app.js',   //第一个
      './src/js/app-router.js',
      './src/js/services.js',
      './src/js/controllers.js',
      './src/js/directive.js',
  ])
    .pipe(uglify())
    .pipe(concat('common.min.js'))
    .pipe(gulp.dest('./www/dist/js/'));
});
//压缩css
gulp.task('minifycss', function () {
    gulp.src('./src/css/style.css')    //需要操作的文件
    .pipe(concat('style.min.css'))   //rename压缩后的文件名
    .pipe(minifyCss())   //执行压缩
    .pipe(gulp.dest('./www/dist/css'));   //输出文件夹
});
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
