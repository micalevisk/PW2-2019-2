/* eslint-disable no-multi-spaces */
const { Router } = require('express');

const router = Router();

const mainController = require('../app/controllers');
const cursoController = require('../app/controllers/curso');

/* ==== Main Controler ==== */
router.get('/',      mainController.index);
router.get('/sobre', mainController.about);

/* ==== Curso Controler ==== */
router.get('/cursos',             cursoController.index);
router.get('/cursos/create',      cursoController.create); // show form
router.post('/cursos/create',     cursoController.create);
router.get('/cursos/update/:id',  cursoController.update); // show form
router.post('/cursos/update/:id', cursoController.update);
router.get('/cursos/read/:id',    cursoController.read);
router.delete('/cursos/remove',   cursoController.remove);

module.exports = router;
