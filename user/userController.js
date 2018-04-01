const express    = require('express'),
      router     = express.Router(),
      bodyParser = require('body-parser'),
      helpers    = require('../helpers'),
      schemas    = require('../schemas'),
      user       = require('./user');

router.use(bodyParser.json());

// POST new user
router.post('/', (request, response) => {
  const getResult = helpers.checkRequest(request.body, schemas.UserSchema);

  if (getResult.addUser) {
    user.create({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password
    },
    (error, addedUser) => {
      if (error) {
        return response.status(500).send('Error with database');
      }

      response.status(200).send(addedUser);
    });
  }
  else {
    return response.status(400).send(`Fill up required fields: ${getResult.missingFields.join(', ')}`);
  }
});

// GET all users
router.get('/', (request, response) => {
  user.find({}, (error, returnedUsers) => {
    if (error) {
      return response.res.status(500).send('Problem with finding users');
    }

    response.status(200).send(returnedUsers);
  });
});

// GET one user
router.get('/:id', (request, response) => {
  user.findById(request.params.id, (error, searchedUser) => {
    if (error) {
      return response.status(500).send('Problem with finding one user');
    }

    if (!searchedUser) {
      return response.status(404).send('User not found');
    }
    else {
      response.status(200).send(searchedUser);
    }
  });
});

// DELETE user
router.delete('/:id', (request, response) => {
  user.findByIdAndRemove(request.params.id, (error, deletedUser) => {
    if (error) {
      return response.status(500).send('Problem with deleting user');
    }

    res.status(200).send(`User ${deletedUser.name} not exist anymore`);
  });
});

// PUT/UPDATE user
router.put('/:id', (request, response) => {
  user.findByIdAndUpdate(
    request.params.id, request.body, { new: true }, (error, user) => {
      if (error) {
        return response.status(500).send('Problem with update this user');
      }

      response.status(200).send(user);
  });
});

module.exports = router;
