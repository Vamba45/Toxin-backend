const Router = require('express');
const router = new Router();
const userController = require('../controller/room_controller');

router.get('/rooms', userController.getRooms);
router.get('/rooms/:id', userController.getOneRoom);
router.put('/rooms', userController.updateRoom);
router.delete('/rooms/:id', userController.deleteRoom);

module.exports = router;