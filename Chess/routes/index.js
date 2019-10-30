const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
  res.locals.isLogged = !!req.session.uid;
  next();
});

/* ==== Main Controler ==== */
router.use('/', require('./main'));

/* ==== Curso Controler ==== */
router.use('/cursos', require('./curso'));

module.exports = router;
