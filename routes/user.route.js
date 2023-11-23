const express = require ('express');
const userCtrl = require('../controller/user.controller');

const router = express.Router();

router.get('/api/v1/user',userCtrl.getUser);
router.post('/api/v1/user',userCtrl.addUser);
router.get('/api/v1/user/:id',userCtrl.getUserById);
router.get('/api/v1/user/login',userCtrl.loginUser);

module.exports = router;