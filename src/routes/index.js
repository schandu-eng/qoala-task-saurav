const express = require('express');
const OCRController = require('../controller/ocr_controller');

const router = express.Router();

router.post('/upload', OCRController.upload);

router.post('/', OCRController.create);
router.delete('/:id', OCRController.destroy);
router.get('/:id', OCRController.get);
router.patch('/:id', OCRController.update);

module.exports = router;


