const db          = require('../models'),
      authService = require('./../services/AuthService');

const create = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const body = request.body;

  if (!body.id && (!body.email || !body.password)) {
    return ReE(response, 'You don\'t provide necessary data to create a user!', 400);
  }
  else {
    // Create or return user
    db.User.findOrCreate({
      where: {
        email: body.email
      },
      defaults: {
        password: body.password,
        passId: (body.passId) ? body.passId : ''
      }
    })
      .spread(function(user, created) {
        if (created) {
          return ReS(
            response,
            { message: 'User created', user: user.get() },
            201
          );
        }
        else {
          return ReE(response, 'User already exist!', 400);
        }
      });
  }
}
module.exports.create = create;

const get = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.params.user_id) {
    db.User.findById(request.params.user_id)
      .then(result => {
        return ReS(response, result.dataValues, 200);
      })
      .catch(() => {
        return ReE(response, 'User with provided ID not found', 404);
      });
  }
  else {
    return ReE(response, 'Provide required params', 400);
  }
}
module.exports.get = get;

const getAll = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  db.User.findAll().then(result => {
    return ReS(response, { users: result }, 200);
  })
  .catch(error => {
    return ReE(response, error, 400);
  });
}
module.exports.getAll = getAll;

const update = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const updateObject = request.body;

  if (request.params.user_id) {
    const defaultValues = {};

    Object.keys(updateObject).forEach(item => {
      defaultValues[item] = {
        $ne: updateObject[item]
      }
    });

    db.User.update(
      updateObject,
    {
      where: {
        id: request.params.user_id,
        $and: [
          defaultValues
        ]
      }
    })
      .then(result => {
        if (result[0]) {
          return ReS(response, { message: 'User updated with below values', user: updateObject }, 200);
        }
        else {
          return ReE(response, 'User can\'t be updated with the same values!', 400);
        }
      })
      .catch(() => {
        return ReE(response, 'Error with update user', 400);
      });
  }
}
module.exports.update = update;

const remove = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const userId = request.params.user_id,
        deleteStatus = {};

  if (userId) {
    db.User.destroy({
      where: {
        id: userId
      }
    })
      .then(result => {
        (result[0]) ? deleteStatus.user = true : deleteStatus.user = false;

        db.Photos.destroy({
          where: {
            userID: userId
          }
        })
          .then(result => {
            (result[0]) ? deleteStatus.photos = true : deleteStatus.photos = false;

            let message = '';
            (deleteStatus.user) ? message += 'Deleted user from database. ' : '';
            (deleteStatus.photos) ? message += 'Deleted all photos from database.' : '';

            if (message.length !== 0) {
              return ReS(response, { message: message }, 200);
            }
            else {
              return ReE(response, 'User ID not fonud in database', 400);
            }
          })
          .catch(() => {
            return ReE(response, 'Error when trying to delete user photos', 400);
          });
      })
      .catch(() => {
        return ReE(response, 'Error when trying to delete user', 400);
      });
  }
}
module.exports.remove = remove;
