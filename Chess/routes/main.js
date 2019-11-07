const { Router } = require('express');

const router = Router();

const mainController = require('../app/controllers/main');

// TODO: refatorar lógica de acesso
/*
const canAccessPage = (req, res, next) => {
  if (req.isLogged) {
    next();
  } else {
    res.redirect('/login');
  }
};
*/

router.get('/',            /* canAccessPage, */ mainController.index);
router.get('/sobre', mainController.about);
router.get('/signup', mainController.signup);
router.post('/signup', mainController.signup);
router.get('/login', mainController.login);
router.post('/login', mainController.login);
router.get('/logout', mainController.logout);
router.get('/partida/:id',    /* canAccessPage, */ mainController.game);
router.get('/partida',        /* canAccessPage, */ mainController.game);
// router.get('/ranking', mainController.ranking);

router.get('/',            /* canAccessPage, */ mainController.index);
router.get('/sobre',       mainController.about);
router.get('/signup',      mainController.signup);
router.post('/signup',     mainController.signup);
router.get('/login',       mainController.login);
router.post('/login',      mainController.login);
router.get('/logout',      mainController.logout);
router.get('/partida/:id',    /* canAccessPage, */ mainController.game);
router.get('/partida',        /* canAccessPage, */ mainController.game);
// router.get('/ranking', mainController.ranking);

module.exports = router;
