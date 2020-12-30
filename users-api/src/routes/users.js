const express = require('express');
import userController from '../controllers/userController'
const router = express.Router();

router.get('/', userController.list);
router.get('/:userId', userController.get);
router.post('/create', userController.create);
router.post('/update/:userId', userController.update);
router.post('/delete/:userId', userController.delete);

module.exports = router;
