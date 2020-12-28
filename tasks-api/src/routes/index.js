const express = require('express');
const router = express.Router();
const taskRouter = require('./tasks')

/* GET home page for Task Service */
router.get('/', function(req, res, next) {
  res.send({
    service_name: 'Task Service'
  })
});

router.use('/tasks', taskRouter)

module.exports = router;
