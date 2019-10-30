const { Router } = require('express');

const router = Router();

const mainController = require('../app/controllers/main');

router.get('/',        mainController.index);
router.get('/sobre',   mainController.about);
router.get('/signup',  mainController.signup);
router.post('/signup', mainController.signup);
router.get('/login',   mainController.login);
router.post('/login',  mainController.login);
router.get('/logout',  mainController.logout);

module.exports = router;
