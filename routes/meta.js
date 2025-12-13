const express = require("express")
const router = express.Router()
const metaController = require('../controllers/metaController');
router.get('/categories',metaController.getCategories);
router.post('/categories',metaController.addCategory);
router.get('/materials',metaController.getMaterials);
module.exports = router