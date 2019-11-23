const { Router } = require('express');

const router = Router();

const controllers = require('../app/controllers');

// TODO: refatorar lógica de acesso
const canAccessPage = (req, res, next) => {
  if (req.isLogged) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/',            canAccessPage, controllers.main.index);

router.get('/sobre',       controllers.main.about);

router.get('/signup',      controllers.main.signup);
router.post('/signup',     controllers.main.signup);

router.get('/login',       controllers.main.login);
router.post('/login',      controllers.main.login);

router.get('/logout',      controllers.main.logout);

router.get('/partida/:id', canAccessPage, controllers.main.game);
router.get('/partida',     canAccessPage, controllers.main.game);

router.get('/ranking',     canAccessPage, controllers.main.ranking);

module.exports = router;
