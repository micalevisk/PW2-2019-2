const { wrapAsync, comparePasswords } = require('../../lib/utils');
const models = require('../models');

const { ValidationError, ValidationErrorItem } = models.Sequelize;

const { Curso, User, Partida } = models;

const log = logger('controllers');

function index(req, res) {
  return res.render('main/index');
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
      agreeToTerms = false,
    } = req.body;

    if (!agreeToTerms) {
      return res.end(); // TODO: lançar erro de validação (precisa definir feedback no frontend)
    }

    const newUserValues = {
      name,
      email,
      password,
      id_curso: idCurso,
    };

    try {
      if (password !== passwordRepeat) { // TODO: mover lógica para o M do MVC
        throw new ValidationError('password not equal', [
          new ValidationErrorItem('As senhas digitadas não são iguais!', 'Validation error', 'passwordRepeat'),
        ]);
      }

      await User.create(newUserValues);
      return res.redirect('/'); // TODO: fazer login automaticamente
    } catch (err) {
      newUserValues.password = null;

      if (err instanceof ValidationError) {
        log.error(err);
        return res.render('main/signup', {
          page: 'Cadastro de Usuário',
          cursos,
          csrfToken: req.csrfToken(),
          user: newUserValues,
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
      req.session.userName = user.name;

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

async function game(req, res) { // TODO: finalizar
  const userIdAuthor = req.session.uid || 1;
  const { color } = req.query;
  const { id: gameId } = req.params;

  if (gameId) {
    const partida = await Partida.findByPk(gameId);
    if (partida) {
      // TODO: verificar se o usuário que solicitou tem permissão para ver essa partida

      return res.render('main/game', {
        page: 'Jogar!',
        styleResources: [
          '/css/chessboard-1.0.0.min.css',
        ],
        jsResources: [
          '/js/chess.min.js',
          '/js/chessboard-1.0.0.min.js',
          '/socket.io/socket.io.js',
        ],
        partida,
      });
    }

    return res.end();
  }

  if (color) { // Criar nova partida.
    const newPartidaValues = {
      id_user_1: userIdAuthor,
      author_color: color,
    };

    try {
      const partida = await Partida.create(newPartidaValues);
      return res.redirect(`/partida/${partida.id}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        log.error(err);
        return res.redirect('/partida');
      }

      throw err;
    }
  }

  const pendingPartida = await Partida.findOne({
    where: {
      id_user_1: userIdAuthor,
      id_user_2: null,
    },
  });

  if (pendingPartida) {
    return res.redirect(`/partida/${pendingPartida.id}`);
  }

  return res.render('main/choosecolor', {
    page: 'nova partida',
  });
}

module.exports = {
  index,
  about,

  signup: wrapAsync(signup),
  login: wrapAsync(login),
  logout,

  game: wrapAsync(game),
};
