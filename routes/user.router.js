const Router = require('express');
const router = new Router();
const userController = require('../controller/room_controller');

router.get('/rooms', userController.getAllRooms);
router.get('/rooms/:id', userController.getOneRoom);
router.post('/rooms', userController.createRooms);
router.put('/rooms', userController.updateOneRoom);
router.delete('/rooms/:id', userController.deleteAllRooms);

module.exports = router;