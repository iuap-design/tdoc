var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    browsersync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    renderFun = require('./bin/render.js');


var path = {
    dist: './dist/',
    cssout: './dist/css',
    less: './src/less/**/*.less',
    htmlout: './dist/html',
    html: './src/html/**/*.html',
    jsout: './dist/js',
    js: './src/js/**/*.js',
    imageout: './dist/images',
    image: './src/images/**/*'
};

//组件和模板地址
var widgetPath = {
    src: ['./src/widget/**/*', './src/html/**/*']
}

var showError = function(err) {
    console.log('\n错误文件:', err.file, '\n错误行数:', err.line, '\n错误信息:', err.message);
}

//将html从src转到dist
var htmlOut = function(htmlPath, htmlOutPath) {
    return gulp.src(htmlPath)
        .pipe(gulp.dest(htmlOutPath))
}
gulp.task('html', function() {
    htmlOut(path.html, path.htmlout)
});

//运行将
gulp.task('render', function() {
    renderFun();
    gulp.watch([widgetPath.src]).on('change', function() {
        renderFun();
    })
})

/*监听less文件，编译输出dist/css目录*/
var lessCompile = function(lessPath, cssout) {
    return gulp.src(lessPath)
        .pipe(sourcemaps.init())
        .pipe(less(
        )).on('error', function(err) {
            showError(err)
        })
        .pipe(autoprefixer([
            'ie >= 9',
            'edge >= 20',
            'ff >= 44',
            'chrome >= 48',
            'safari >= 8',
            'opera >= 35',
            'ios >= 8'
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssout))
        .on('end', function() {
            browsersync.reload();
        })
}
/* 转换less成css */
gulp.task('less', function() {
    lessCompile(path.less, path.cssout);
})

/*output dist/script*/
var scriptOut = function(jsPath, jsOutPath) {
    return gulp.src(jsPath)
        .pipe(uglify())
        .pipe(gulp.dest(jsOutPath))
}
/* 转移src下的script到dist，并压缩 */
gulp.task('script', function() {
    scriptOut(path.js, path.jsout)
})

/* output images*/
var imagesOut = function(imagePath, imageOutPath) {
    return gulp.src(imagePath)
        .pipe(imagemin())
        .pipe(gulp.dest(imageOutPath))
}
/* 转移src下的image到dist，并压缩 */
gulp.task('images', function() {
    imagesOut(path.image, path.imageout);
})

/* 起服务，并监听各个资源，一旦有改动，就自动刷新页面 */
gulp.task('live', ['less', 'render'], function() {
    browsersync.init({
        port: 3333,
        startPath:'./dist/html/index.html',//默认打开的初始地址，可以不加
        server: {
            baseDir: './',
            directory: true
        }
    })
    gulp.watch(path.less, ['less'])
    gulp.watch(path.js).on('change', browsersync.reload)
    gulp.watch(path.html).on('change', browsersync.reload)
})

gulp.task('output', ['html', 'less', 'script', 'images'])
//最终产出
gulp.task('dist', ['output'])

//启动服务
gulp.task('default', ['live']);
