'use strict';
/* global process */
const gulp = require('gulp');

const loggerInfo = require('../logger-info');
const loggerError = require('../logger-error');

function bundlePostcss(env, packmonConfig) {
    const postcss = require('gulp-postcss');
    const minify = require('gulp-clean-css');

    const cssImport = require('../plugins/css-import');
    const fileAssets = require('../plugins/file-assets');
    const dest = require('../plugins/dest');

    const config = require('../get-gulp-config')(env, packmonConfig);
    var fileList = [];

    packmonConfig.entry.stylesheet.forEach(entryObj => {
        var fileName = Object.keys(entryObj)[0];

        fileList.push(entryObj[fileName]);
    });

    return gulp.task('bundle-postcss', function() {
        var stream;
        //  设置任务开始的时间
        process._startDate_ = new Date();

        stream = gulp.src(fileList, config.src.options)
            .pipe(cssImport(config.plugins.cssImport))
            .on('error', function (err) {
                loggerError(err.toString());this.emit('end');
            })
            .pipe(postcss(config.plugins.postcss.plugins))
            .on('error', function (err) {
                loggerError(err.toString());this.emit('end');
            });

        if (env !== 'development') {
            stream.pipe(minify(config.plugins.minify))
                .on('error', function (err) {
                    loggerError(err.toString());this.emit('end');
                });
        }

        stream.pipe(fileAssets(config.plugins.fileAssets))
            .on('error', function (err) {
                loggerError(err.toString());this.emit('end');
            })
            .pipe(dest(config.plugins.dest.directory, config.plugins.dest.options))
            .on('error', function (err) {
                loggerError(err.toString());this.emit('end');
            })
            .pipe(gulp.dest(config.dest.path, config.dest.options))
            .on('end', () => {
                loggerInfo(process._startDate_, new Date());
            });

        return stream;
    });
}

module.exports = bundlePostcss;
