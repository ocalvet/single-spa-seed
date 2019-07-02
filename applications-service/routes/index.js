const passport = require('passport');

const addRoutes = app => {
  app.get('/applications', (req, res) => {
    res.json({ msg: 'You want apps, not here!' });
  });
  app.use(
    '/applications/apps',
    passport.authenticate('jwt', { session: false }),
    require('./apps')
  );
};

module.exports = addRoutes;
