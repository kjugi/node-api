const express         = require('express'),
      router          = express.Router(),
      passport        = require('passport'),
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
router.put('/users/:user_id', userController.update);

// Delete user
router.delete('/users/:user_id', userController.remove);

// Route /v1/photo

// Create photo
router.post('/photo', photoController.create);

// Get photo to specific user
router.get('/photo/:user_id', photoController.get);

// Update photo
router.put('/photo/:photo_id', photoController.update);

// Delete photo
router.delete('/photo:/photo_id', photoController.remove);

module.exports = router;
