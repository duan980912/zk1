//引入模块

var gulp = require("gulp");
var sass = require("gulp-sass");
var cssmin = require("gulp-clean-css");
var jsmin = require("gulp-uglify");
var babel = require("gulp-babel");
var server = require("gulp-webserver");
var path = require("path");
var fs = require("fs");
var url = require("url");

//搭建服务
gulp.task("devServer", function() {
    return gulp.src("./src")
        .pipe(server({
            port: 8888,
            host: "169.254.49.80",
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === "/favicon.ico" || pathname === "/js/lib/swiper.min.js.map") {
                    return;
                }
                if (pathname === "/") {
                    res.end(fs.readdirSync(path.join(__dirname, "src", "index.html")))
                } else {
                    var extname = path.extname(pathname);
                    if (extname) {
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    } else {
                        switch (pathname) {
                            case "/api/swiper":
                                res.end()
                                break;
                            default:
                                res.end()
                        }
                    }
                }
            }
        }))
});
//开发环境的css
gulp.task("devCss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest("./src/css"))
});
//wathc 监听
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devCss"))
});
//开发环境
gulp.task("dev", gulp.series("devServer", "devCss", "watch"))