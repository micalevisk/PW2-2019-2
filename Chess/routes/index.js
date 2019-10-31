const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
  req.isLogged = !!req.session.uid;
  res.locals.isLogged = req.isLogged; // To Handlebars
  next();
});

// TODO: refatorar lógica de acesso
const canAccessPage = (req, res, next) => {
  if (req.isLogged) {
    next();
  } else {
    res.redirect('/login');
  }
};

/* ==== Main Controler ==== */
router.use('/', require('./main'));

/* ==== Curso Controler ==== */
router.use('/cursos', canAccessPage, require('./curso'));

module.exports = router;
