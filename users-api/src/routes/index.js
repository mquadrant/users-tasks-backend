const express = require('express');
const router = express.Router();
const userRouter = require('./users')
/* GET home page for User Service */
router.get('/', function(req, res, next) {
  res.send({
    service_name: 'User Service'
  })
});

router.use('/users', userRouter)

module.exports = router;
