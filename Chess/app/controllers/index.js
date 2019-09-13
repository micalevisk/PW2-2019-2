module.exports.index = (req, res) => {
  res.render('main/index', { title: 'Express' });
};

module.exports.about = (req, res) => {
  res.render('main/about', {
    title: 'O Jogo de Xadrez',
    imgAlt: 'O imperador germânico Otão II jogando xadrez com uma cortesã numa iluminura de 1320',
    aboutChessGame: 'Xadrez é um esporte, também considerado uma arte e uma ciência. Pode ser classificado como um jogo de tabuleiro de natureza recreativa ou competitiva para dois jogadores, sendo também conhecido como Xadrez Ocidental ou Xadrez Internacional para distingui-lo dos seus antecessores e de outras variantes atuais.',
  });
};
