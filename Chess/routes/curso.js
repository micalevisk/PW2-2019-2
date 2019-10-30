const { Router } = require('express');

const router = Router();

const cursoController = require('../app/controllers/curso');

router.get('/',            cursoController.index);
router.get('/create',      cursoController.create); // show form
router.post('/create',     cursoController.create);
router.get('/update/:id',  cursoController.update); // show form
router.post('/update/:id', cursoController.update);
router.get('/read/:id',    cursoController.read);
router.delete('/remove',   cursoController.remove);

module.exports = router;
