const { Router } = require('express');

const router = Router();

const controllers = require('../app/controllers');

router.get('/',            controllers.curso.index);

router.get('/create',      controllers.curso.create);
router.post('/create',     controllers.curso.create);

router.get('/update/:id',  controllers.curso.update);
router.post('/update/:id', controllers.curso.update);

router.get('/read/:id',    controllers.curso.read);

router.delete('/remove',   controllers.curso.remove);

module.exports = router;
