const Router = require('express');
const router = new Router();
const controller = require('../controller/auth_controller.js');

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/user', controller.getUser);

module.exports = router;