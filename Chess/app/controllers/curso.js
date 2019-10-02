const models = require('../models');
const { wrapAsync } = require('../../lib/utils');

const { curso: Curso } = models;

async function index(req, res) {
  const cursos = await Curso.findAll();
  res.render('curso/index', { cursos });
}

async function create(req, res) {
  if (req.route.methods.get) {
    return res.render('curso/create');
  }

  if (req.route.methods.post) {
    const {
      initials,
      name,
      description,
      id_area: idArea,
    } = req.body;

    await Curso.create({
      initials,
      name,
      description,
      id_area: idArea,
    });

    return res.redirect('/curso');
  }

  return res.end();
}

async function read(req, res) {
  res.end();
}

async function update(req, res) {
  res.end();
}

async function remove(req, res) {
  res.end();
}


module.exports = {
  index: wrapAsync(index),
  create: wrapAsync(create),
  read: wrapAsync(read),
  update: wrapAsync(update),
  remove: wrapAsync(remove),
};
