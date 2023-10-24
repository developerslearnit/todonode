const express = require ('express');
const categoryCtrl = require('../controller/category.controller');

const router = express.Router();

router.get('/api/v1/categories',categoryCtrl.getCategories);
router.post('/api/v1/categories',categoryCtrl.addCategory);

module.exports = router;