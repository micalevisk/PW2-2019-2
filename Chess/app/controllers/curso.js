// TODO: os objs `rows` podem ser `undefined`,
//       então qualquer acesso de prop direto deve ter um fallback

const models = require('../models');
const { wrapAsync } = require('../../lib/utils');

const { curso: Curso } = models;

async function index(req, res) {
  const cursos = await Curso.findAll();
  res.render('curso/index', { page: 'Cursos', cursos });
}

async function create(req, res) {
  if (req.route.methods.get) {
    return res.render('curso/create', { page: 'Adicionar Curso' });
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
  const { id } = req.params;
  // TODO: fetch value of attribute `id_area`
  const cursoRow = await Curso.findOne({ where: { id } });

  res.render('curso/read', {
    page: 'Editar Curso',
    curso: cursoRow.dataValues,
  });
}

async function update(req, res) {
  const { id } = req.params;
  const cursoRow = await Curso.findByPk(id);

  if (req.route.methods.get) {
    return res.render('curso/update', {
      page: 'Editar Curso',
      curso: cursoRow.dataValues,
    });
  }

  if (req.route.methods.post) {
    cursoRow.initials = req.body.initials;
    cursoRow.name = req.body.name;
    cursoRow.description = req.body.description;
    cursoRow.id_area = req.body.id_area;

    try {
      await cursoRow.save();
      return res.redirect('/curso');
    } catch (err) {
      return res.render('curso/update', {
        page: 'Editar Curso',
        curso: cursoRow.dataValues,
        errors: err.errors,
      });
    }
  }

  return res.end();
}

async function remove(req, res) {
  const { id } = req.params;
  const cursoRow = await Curso.findByPk(id);

  if (req.route.methods.get) {
    return res.render('curso/remove', { curso: cursoRow.dataValues });
  }

  if (req.route.methods.post) {
    await Curso.destroy({ where: { id: req.body.id } });
    return res.redirect('/curso');
  }

  return res.end();
}


module.exports = {
  index: wrapAsync(index),
  create: wrapAsync(create),
  read: wrapAsync(read),
  update: wrapAsync(update),
  remove: wrapAsync(remove),
};
