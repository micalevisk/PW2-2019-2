const { Router } = require('express');

const router = Router();

const mainController = require('../app/controllers');

router.get('/', mainController.index);

router.get(['/sobre', '/about'], mainController.about);

module.exports = router;
