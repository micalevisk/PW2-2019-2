/* eslint-disable no-multi-spaces */
const { Router } = require('express');

const router = Router();

const cursoController = require('../app/controllers/curso');
const mainController = require('../app/controllers/main');

router.use((req, res, next) => {
  res.locals.isLogged = !!req.session.uid;
  next();
});

/* ==== Main Controler ==== */
router.get('/',        mainController.index);
router.get('/sobre',   mainController.about);
router.get('/signup',  mainController.signup);
router.post('/signup', mainController.signup);
router.get('/login',   mainController.login);
router.post('/login',  mainController.login);
router.get('/logout',  mainController.logout);

/* ==== Curso Controler ==== */
router.get('/cursos',             cursoController.index);
router.get('/cursos/create',      cursoController.create); // show form
router.post('/cursos/create',     cursoController.create);
router.get('/cursos/update/:id',  cursoController.update); // show form
router.post('/cursos/update/:id', cursoController.update);
router.get('/cursos/read/:id',    cursoController.read);
router.delete('/cursos/remove',   cursoController.remove);

/* ==== hidden endpoints ==== */
const { Area, Curso, User } = require('../app/models');

router.get('/api/users', (req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
});
router.get('/api/areas', (req, res) => {
  Area.findAll().then((areas) => {
    res.json(areas);
  });
});
router.get('/api/cursos', (req, res) => {
  Curso.findAll().then((cursos) => {
    res.json(cursos);
  });
});

module.exports = router;
