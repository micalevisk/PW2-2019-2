/* eslint-disable no-multi-spaces */
const { Router } = require('express');
// const sequelize = require('sequelize');

const router = Router();

const mainController = require('../app/controllers');
const cursoController = require('../app/controllers/curso');

/* ==== Main Controler ==== */
router.get('/',                  mainController.index);
router.get('/ui',                mainController.ui);
router.get(['/sobre', '/about'], mainController.about);

/* ==== Curso Controler ==== */
router.get('/curso',             cursoController.index);
router.get('/curso/create',      cursoController.create); // show form
router.post('/curso/create',     cursoController.create);
router.get('/curso/update/:id',  cursoController.update); // show form
router.put('/curso/update/:id',  cursoController.update);
router.get('/curso/read/:id',    cursoController.read);
router.post('/curso/remove/:id', cursoController.remove);

// eslint-disable-next-line prefer-arrow-callback
// router.use(function handleDatabaseError(err, req, res, next) {
//   if (err instanceof sequelize.Error) {
//   }

//   return next(err);
// });

module.exports = router;
