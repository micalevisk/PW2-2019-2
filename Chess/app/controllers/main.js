const { wrapAsync, comparePasswords } = require('../../lib/utils');
const models = require('../models');

const { ValidationError, ValidationErrorItem } = models.Sequelize;

const { Curso, User } = models;


function index(req, res) {
  res.render('main/index');
}

function about(req, res) {
  res.render('main/about', { page: 'Sobre' });
}


async function signup(req, res) {
  const cursos = await Curso.findAll();

  if (req.route.methods.get) {
    return res.render('main/signup', {
      page: 'Cadastro de Usuário',
      cursos,
      csrfToken: req.csrfToken(),
    });
  }

  if (req.route.methods.post) {
    const {
      name,
      email,
      password,
      passwordRepeat,
      idCurso,
      acceptTerms,
    } = req.body;

    const newUserData = {
      name,
      email,
      password,
      id_curso: idCurso,
      acceptTerms,
    };

    try {
      if (password !== passwordRepeat) { // TODO: mover lógica para o M do MVC
        throw new ValidationError('password not equal', [
          new ValidationErrorItem('As senhas digitadas não são iguais!', 'Validation error', 'passwordRepeat'),
        ]);
      }

      await User.create(newUserData);
      return res.redirect('/'); // TODO: fazer login automaticamente
    } catch (err) {
      newUserData.password = null;

      if (err instanceof ValidationError) {
        return res.render('main/signup', {
          page: 'Cadastro de Usuário',
          cursos,
          csrfToken: req.csrfToken(),
          user: newUserData,
          errors: err.errors,
        });
      }

      throw err;
    }
  }

  return res.end();
}

async function login(req, res) {
  if (req.isLogged) {
    return res.redirect('/');
  }

  const { email, password /* remember */ } = req.body;
  const userData = {
    email,
    password,
  };


  if (req.route.methods.get) {
    return res.render('main/login', {
      page: 'Entrar',
      csrfToken: req.csrfToken(),
      user: userData,
    });
  }

  if (req.route.methods.post) {
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) { // TODO: mover lógica para o M do MVC
        throw new ValidationError('user not found', [
          new ValidationErrorItem('Nenhum usuário com esse endereço de e-mail foi encontrado.', 'Validation error', 'email'),
        ]);
      }

      const isValidPassword = await comparePasswords(password, user.password);
      if (!isValidPassword) { // TODO: mover lógica para o M do MVC
        throw new ValidationError('invalid password', [
          new ValidationErrorItem('Senha incorreta!', 'Validation error', 'password'),
        ]);
      }

      req.session.uid = user.id;
      return res.redirect('/');
    } catch (err) {
      return res.render('main/login', {
        page: 'Entrar',
        csrfToken: req.csrfToken(),
        user: userData,
        errors: err.errors,
      });
    }
  }

  return res.end();
}

function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    return res.redirect('/login');
  });
}


module.exports = {
  index,
  about,

  signup: wrapAsync(signup),
  login: wrapAsync(login),
  logout,
};
