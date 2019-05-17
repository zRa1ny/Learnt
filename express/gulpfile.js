var gulp = require("gulp");
gulp.task('default', gulp.series('server', (done) => done()))