const Router = require('koa-router');
const router = new Router({
  prefix: '/api'
});

const ctrl = require('../controller/api');

router
  .get('/', ctrl.index)
;

module.exports = router;
