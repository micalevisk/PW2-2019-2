const { wrapAsync } = require('../../lib/utils');
const models = require('../models');

const { ValidationError } = models.Sequelize;

const { curso: Curso, area: Area } = models;

async function index(req, res) {
  const cursos = await Curso.findAll();
  res.render('curso/index', {
    page: 'Cursos',
    csrfToken: req.csrfToken(),
    cursos,
  });
}

async function create(req, res) {
  if (req.route.methods.get) {
    return res.render('curso/create', {
      page: 'Adicionar Curso',
      csrfToken: req.csrfToken(),
    });
  }

  if (req.route.methods.post) {
    const {
      initials,
      name,
      description,
      idArea,
    } = req.body;

    const newCursoData = {
      initials,
      name,
      description,
      id_area: idArea,
    };

    try {
      await Curso.create(newCursoData);
      return res.redirect('/cursos');
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.render('curso/create', {
          page: 'Adicionar Curso',
          csrfToken: req.csrfToken(),
          curso: newCursoData,
          errors: err.errors,
        });
      }

      throw err;
    }
  }

  return res.end();
}

async function read(req, res, next) {
  const { id } = req.params;
  const cursoRow = await Curso.findByPk(id, {
    include: {
      model: Area,
      as: 'area',
    },
  });

  if (!cursoRow) {
    return next();
  }

  return res.render('curso/read', {
    page: 'Editar Curso',
    curso: cursoRow.dataValues,
  });
}

async function update(req, res, next) {
  const { id } = req.params;
  const cursoRow = await Curso.findByPk(id);

  if (!cursoRow) {
    return next();
  }

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
      return res.redirect('/cursos');
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

async function remove(req, res, next) {
  if (req.route.methods.get) {
    const { id } = req.params;
    const cursoRow = await Curso.findByPk(id);

    if (!cursoRow) {
      return next();
    }

    return res.render('curso/remove', {
      page: 'Apagar Curso',
      curso: cursoRow.dataValues,
    });
  }

  if (req.route.methods.delete) {
    const { id } = req.body;
    await Curso.destroy({ where: { id } });
    return res.send(`curso de id ${id} removido!`);
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
