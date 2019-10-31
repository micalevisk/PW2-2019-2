const { wrapAsync, comparePasswords } = require('../../lib/utils');
const models = require('../models');

const { ValidationError, ValidationErrorItem } = models.Sequelize;

const { Curso, User, Partida } = models;


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

async function game(req, res) {
  const { color } = req.query;
  const { id: gameId } = req.params;

  if (!gameId) { // Recuperar partida iniciada mas sem oponente ou inicar processo para criar nova partida.
    const userIdAuthor = req.session.uid || 1;

    if (color) { // Criar nova partida.
      const newPartidaData = {
        id_user_1: userIdAuthor,
        fen: 'start',
        author_color: color,
      };

      try {
        const partida = await Partida.create(newPartidaData);
        return res.redirect(`/partida/${partida.id}`); // TODO: refatorar lógica
      } catch (err) {
        if (err instanceof ValidationError) {
          return res.redirect('/partida');
        }

        throw err;
      }
    } else {
      // TODO: procurar partida pendende do usuário de id igual a `req.session.uid`, i.e., partida onde `user_id_2` é null
      // const pendingPartida = await Partida.findOne({ where: { user_id_1: user_id_1, user_id_2: null  } })
    }

    return res.render('main/choosecolor', {
      page: 'iniciar nova partida',
    });
  }

  const partida = await Partida.findByPk(gameId);
  if (partida) {
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

module.exports = {
  index,
  about,

  signup: wrapAsync(signup),
  login: wrapAsync(login),
  logout,

  game: wrapAsync(game),
};
