var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var htmlclean = require('gulp-htmlclean');
var strip = require('gulp-strip-debug');//删除调试断断点语句
var uglify = require('gulp-uglify');//压缩代码
var concat = require('gulp-concat');
var less = require('gulp-less');
var postcss = require('gulp-postcss');//可以添加前缀
var autoprefixer = require('autoprefixer');//css添加前缀
var cssnano = require('cssnano');//css压缩代码
var connect = require('gulp-connect');//开启服务器

var devMode = process.env.NODE_ENV == 'development';
// var devMode = process.env.NODE_ENV == 'production';
console.log(devMode)
var folder = {
    src: './src/',
    build: './build/'
}

gulp.task('image', function (){

    gulp.src(folder.src + 'imgs/*')
    
        .pipe(newer(folder.build + 'imgs'))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + 'imgs'))

})
gulp.task('html', function () {

    var page = gulp.src(folder.src + 'html/*');
    page.pipe(connect.reload());
    if (!devMode) {
        page.pipe(htmlclean());
    }
        page.pipe(gulp.dest(folder.build + 'html'));

})
gulp.task('js', function () {

    var page = gulp.src(folder.src + 'js/*');
    page.pipe(connect.reload());
        
        // page.pipe(concat('main.js'));
    if (!devMode) {
        page.pipe(strip());
        page.pipe(uglify());
    }
    page.pipe(gulp.dest(folder.build + 'js'));
})
gulp.task('css', function () {
    var options =  [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + 'css/*')
        // .pipe(connect.reload())
        .pipe(less())
        .pipe(connect.reload())
    
    if(!devMode){
        console.log('到了')
        page.pipe(postcss(options)); 
    }
    page.pipe(gulp.dest(folder.build + 'css'));
        
})
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'imgs/*', ['image']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
})

gulp.task('server', function () {
    connect.server({
        port:8888,
        livereload: true//页面自动刷新
    });
})
gulp.task('default', ['html', 'image', 'js', 'css', 'watch', 'server'], function () {
    console.log(111);

})