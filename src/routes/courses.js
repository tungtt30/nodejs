const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');

router.patch('/:id/restore', courseController.restore);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.destroy);
router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.get('/:slug', courseController.show);

module.exports = router;
