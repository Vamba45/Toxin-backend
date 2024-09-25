const Router = require('express');
const router = new Router();
const controller = require('../controller/auth_controller.js');

router.post('/user', controller.createUser);
router.delete('/user', controller.removeUser);
router.get('/user', controller.getUser);

module.exports = router;