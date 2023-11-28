const express = require ('express');
const userCtrl = require('../controller/user.controller');

const router = express.Router();

router.get('/api/v1/user',userCtrl.getUser);
router.post('/api/v1/auth/login',userCtrl.loginUser);
router.post('/api/v1/user',userCtrl.addUser);
router.get('/api/v1/user/:id',userCtrl.getUserById);

module.exports = router;