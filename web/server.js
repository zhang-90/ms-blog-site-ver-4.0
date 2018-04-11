'use strict';
/* global __dirname */
const path = require('path');

const config = require('../config');

const koaStatic = require('koa-static');
const koaBody = require('koa-bodyparser');
const koaSession = require('koa-session');
const koaLogger = require('koa-logger');
const Koa = require('koa');
const app = new Koa();

const router = require('./controller/_router');
const globalException = require('./middleware/global-exception');

app.keys = config.sessionKeys;

app.use(koaSession(config.session, app))
    .use(koaStatic(path.resolve(__dirname, './public')))
    .use(koaBody())
    .use(koaLogger())
    .use(globalException)
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.port);
