//Import all dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync');


// Create an array of all js files

const jsFiles = [
  'src/js/main.js'
]
// Create all the tasks

gulp.task('sass', function() {
  gulp.src('src/sass/*.scss') // Indicate the sass folder
      .pipe(sass().on('error', sass.logError)) // Catch errors 
      .pipe(autoprefixer("last 2 versions")) // Add the autoprefixer dependency
      .pipe(gulp.dest('dist/css')) // And finally indicate where to compile the css file
      .pipe(browserSync.stream())
})

gulp.task('imagemin', function() {
  gulp.src('src/images/*') // Minify every images in the folder
      .pipe(imagemin()) // calls the actual imagemin function 
      .pipe(gulp.dest('dist/images')) // Indicate the destination folder of the minified images
})

gulp.task("clean", function() {
  return del(["dist/css/*", "dist/js/*"])
})

gulp.task("scripts", function() {
  gulp.src(jsFiles) // Specify the source folder
      .pipe(concat('main.js')) // Call the concat function and the name of the file of all concatenated files
      .pipe(uglify()) //Call the uglify dependency
      .pipe(gulp.dest('dist/js')) // Indicate the destination folder
})

gulp.task("serve", ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })

  gulp.watch('src/js/*.js', ['scripts']) // Call the watch function for every changes in the js folder
  gulp.watch('src/images/*', ['imagemin'])
  gulp.watch('src/sass/**/*', ['sass'])
  gulp.watch('dist/*.html').on('change', browserSync.reload);
})

gulp.task('default', ['serve', 'clean']);