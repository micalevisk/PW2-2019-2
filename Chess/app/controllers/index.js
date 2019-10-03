module.exports.index = (req, res) => {
  res.render('main/index');
};

module.exports.about = (req, res) => {
  res.render('main/about', { page: 'Sobre' });
};

module.exports.ui = (req, res) => {
  res.render('main/ui');
};
