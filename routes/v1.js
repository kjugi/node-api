const express         = require('express'),
      router          = express.Router(),
      custom          = require('./../middleware/custom'),
      passport        = require('passport'),
      path            = require('path'),
      userController  = require('./../controllers/userController'),
      photoController = require('./../controllers/photoController');

router.get('/', function(request, response, next) {
  response.json({ status: 'success', message: 'API', data:{ 'version_numbe': 'v1.0.0' }});
});

// Route /v1/users

// Create user
router.post('/users', userController.create);

// Get all users
router.get('/users', userController.getAll);

// Get one user
router.get('/users/:user_id', userController.get);

// Update user
router.put('/users/:user_id', passport.authenticate('jwt', { session: false }), userController.update);

// Delete user
router.delete('/users/:user_id', passport.authenticate('jwt', { session: false }), userController.remove);

//
router.post('/users/login', userController.login);

// Route /v1/photo

// Create photo
router.post('/photo', passport.authenticate('jwt', { session: false }), photoController.create);

// Get photo to specific user
router.get('/photo/:user_id', passport.authenticate('jwt', { session: false }), photoController.get);

// Update photo
router.put('/photo/:photo_id', passport.authenticate('jwt', { session: false }), photoController.update);

// Delete photo
router.delete('/photo:/photo_id', passport.authenticate('jwt', { session: false }), photoController.remove);

module.exports = router;
