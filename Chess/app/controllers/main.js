const {
  comparePasswords,
  capitalize,
  getBoardOrientation,
  getFirstname,
  wrapAsync,
} = require('../../lib/utils');
const models = require('../models');

const {
  ValidationError, ValidationErrorItem,
  Op,
  fn: SequelizeFN,
  col: SequelizeCol,
} = models.Sequelize;

const { Curso, User, Partida } = models;

const log = logger('controllers');

async function index(req, res) {
  const userIdAuthor = req.session.uid;

  // Partidas em que o usuário ou é o criador ou o adversário
  const userMatches = await Partida.findAll({
    where: {
      [Op.or]: [
        { id_user_1: userIdAuthor },
        { id_user_2: userIdAuthor },
      ],
    },
    include: [
      { association: 'userOwner', required: true, attributes: ['name'] },
      { association: 'userOpponent', required: false, attributes: ['name'] },
    ],
  });

  // Partidas de outros usuários que não há oponentes
  const matchesOnHold = await Partida.findAll({
    where: {
      id_user_1: { [Op.ne]: userIdAuthor },
      id_user_2: null,
    },
    include: { association: 'userOwner', attributes: ['name'] },
  });

  return res.render('main/index', {
    styleResources: [
      '/css/chessboard-1.0.0.min.css',
    ],
    jsResources: [
      '/js/chess.min.js',
      '/js/chessboard-1.0.0.min.js',
      // '/socket.io/socket.io.js',
    ],
    userMatches,
    matchesOnHold,
  });
}

function about(req, res) {
  res.render('main/about', { page: 'sobre' });
}

function createSessionToUser(user, req) {
  req.session.uid = user.id;
  req.session.userName = user.name;
}

function destroySession(req) {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}


async function signup(req, res) {
  const cursos = await Curso.findAll();

  if (req.route.methods.get) {
    return res.render('main/signup', {
      page: 'cadastro de usuário',
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

      const newUser = await User.create(newUserValues);

      createSessionToUser(newUser, req);

      return res.redirect('/');
    } catch (err) {
      newUserValues.password = null;

      if (err instanceof ValidationError) {
        log.error(err);
        return res.render('main/signup', {
          page: 'cadastro de usuário',
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
      page: 'entrar',
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

      createSessionToUser(user, req);

      return res.redirect('/');
    } catch (err) {
      log.error(err);
      return res.render('main/login', {
        page: 'entrar',
        csrfToken: req.csrfToken(),
        user: userData,
        errors: err.errors,
      });
    }
  }

  return res.end();
}

async function logout(req, res) {
  await destroySession(req);
  return res.redirect('/login');
}

async function game(req, res, next) {
  const userIdAuthor = req.session.uid;

  const { color } = req.query;
  const { id: gameId } = req.params;

  if (gameId) {
    let partidaRow = await Partida.findByPk(gameId, { // §
      include: [
        { association: 'userOwner', required: true, attributes: ['id', 'name'] },
        { association: 'userOpponent', required: false, attributes: ['id', 'name'] },
      ],
    });
    if (!partidaRow) {
      return next('router'); // Not Found
    }

    const ownerFirstName = capitalize(getFirstname(partidaRow.userOwner.name));
    let opponentFirstName = partidaRow.userOpponent
      ? capitalize(getFirstname(partidaRow.userOpponent.name))
      : null;

    const userIsOwner = (userIdAuthor === partidaRow.id_user_1);
    const [userColor, opponentColor] = getBoardOrientation(userIsOwner, partidaRow.author_color);

    let userIsOpponent = (userIdAuthor === partidaRow.id_user_2);
    let matchWaitingOpponent = (partidaRow.id_user_2 === null);
    // NOTE: `id_winner` equals to `NULL` could mean that the match is in draw or is pending.
    const matchHasWinner = (partidaRow.id_winner !== null && !matchWaitingOpponent);

    if (matchWaitingOpponent && !userIsOwner) {
      await partidaRow.update({
        id_user_2: userIdAuthor,
        fen: 'start',
      });

      // Requery due to issues #3424 and #5471 (https://github.com/sequelize/sequelize/issues)
      partidaRow = await Partida.findByPk(gameId, { // §
        include: [
          { association: 'userOwner', required: true, attributes: ['id', 'name'] },
          { association: 'userOpponent', required: true, attributes: ['id', 'name'] },
        ],
      });

      opponentFirstName = capitalize(getFirstname(partidaRow.userOpponent.name));
      userIsOpponent = true;
      matchWaitingOpponent = false;
    }

    if (![partidaRow.id_user_1, partidaRow.id_user_2].includes(userIdAuthor)) {
      return next(); // TODO: Forbidden
    }

    return res.render('main/game', {
      page: (opponentFirstName ? `${ownerFirstName} vs ${opponentFirstName}` : 'esperando algum oponente'),
      styleResources: [
        '/css/chessboard-1.0.0.min.css',
      ],
      jsResources: [
        '/js/chess.min.js',
        '/js/chessboard-1.0.0.min.js',
        '/socket.io/socket.io.js',
      ],
      match: {
        ...partidaRow.get({ plain: true }),
        userIsOpponent,
        userColor,
        opponentColor,
        waitingOpponent: matchWaitingOpponent,
        hasWinner: matchHasWinner,
      },
    });
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

  if (color) { // Criar nova partida ou usar a pendente.
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

  return res.render('main/choosecolor', {
    page: 'nova partida',
  });
}

async function ranking(req, res) {
  const winners = await Partida.findAll({
    raw: true,
    group: ['id_winner'],
    attributes: [
      'id_winner',
      [SequelizeFN('COUNT', 'id_winner'), 'wins'],
      [SequelizeCol('winner.name'), 'name'],
    ],
    order: [
      [SequelizeCol('wins'), 'DESC'],
    ],
    include: [
      { association: 'winner', required: true, attributes: [] },
    ],
    where: {
      id_winner: {
        [Op.notIn]: ['null', '-1'],
      },
    },
  });
  // .map((el) => el.get({ plain: true })); // NOTE: when `raw:false`, due to issue #6950

  return res.render('main/ranking', {
    page: 'hall da fama',
    winners,
  });
}


module.exports = {
  index: wrapAsync(index),
  about,

  signup: wrapAsync(signup),
  login: wrapAsync(login),
  logout: wrapAsync(logout),

  game: wrapAsync(game),
  ranking: wrapAsync(ranking),
};
