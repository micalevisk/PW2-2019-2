/* eslint-disable no-multi-spaces */
const csrf = require('csurf');
const { Router } = require('express');

/**
 * Setup route middlewares.
 */
const csrfProtection = csrf({ cookie: true });

const router = Router();

const mainController = require('../app/controllers');
const cursoController = require('../app/controllers/curso');

/* ==== Main Controler ==== */
router.get('/',                  mainController.index);
router.get('/ui',                mainController.ui);
router.get(['/sobre', '/about'], mainController.about);

/* ==== Curso Controler ==== */
router.get('/cursos',             csrfProtection, cursoController.index);
router.get('/cursos/create',      cursoController.create); // show form
router.post('/cursos/create',     cursoController.create);
router.get('/cursos/update/:id',  cursoController.update); // show form
router.post('/cursos/update/:id', cursoController.update);
router.get('/cursos/read/:id',    cursoController.read);
router.delete('/cursos/remove',   csrfProtection, cursoController.remove);

module.exports = router;
