var path = require('path');
var auth = require(__dirname + '/../auth/auth');
var placeController = require(__dirname + '/../places/placeController');
var userController = require(__dirname + '/../users/userController');
var renderIndex = require(__dirname + '/indexHandler');


module.exports = function(app, express) {
  var env = process.env.NODE_ENV || 'development';

  var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
  };

  if (env === 'production') {
    app.use(forceSsl);
  }

  app.use(express.static(__dirname + '/../../client'));
  app.get('/home', renderIndex);

  app.get('/api/places', placeController.searchGoogle);

  app.post('/api/places/saved', auth.checkAuth, placeController.saveOne);
  app.get('/api/places/saved', auth.checkAuth, placeController.getAllSaved);
  app.delete('/api/places/saved', auth.checkAuth, placeController.deleteOne);

  app.post('/api/users', userController.saveOne);

  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../../client/login.html'));
  });

  app.get('/auth/google', auth.handleGoogleLogin);

  app.get('/auth/google/callback', auth.authenticateGoogleLogin,
    function(req, res) {
      res.redirect('/home');
    }
  );

  app.get('/auth/logout', function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  });
};
