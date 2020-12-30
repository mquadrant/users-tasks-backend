import express from 'express';
import taskController from '../controllers/taskController'
const router = express.Router();

router.get('/:userId', taskController.list);
router.post('/create', taskController.create);
router.post('/update/:userId/:taskId', taskController.update);
router.post('/delete/:userId/:taskId', taskController.delete);

module.exports = router;
