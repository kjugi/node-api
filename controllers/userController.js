const db          = require('../models'),
      authService = require('./../services/AuthService');

const create = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const body = request.body;

  if (!body.id
      && (!body.nick
      || !body.stadium
      || !body.tribune
      || !body.sector
      || !body.row
      || !body.place)
  ) {
    return ReE(response, 'You don\'t provide necessary data to create a user!', 400);
  }
  else {
    // Create or return user
    db.User.findOrCreate({
      where: {
        nick: body.nick
      },
      defaults: {
        stadium: body.stadium,
        tribune: body.tribune,
        sector: body.sector,
        row: body.row,
        place: body.place
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
  // Use update from sequelize + send to user update and check is updated value
  // is not nick + return error when nick already existing
  response.setHeader('Content-Type', 'application/json');

  const updateObject = request.body;

  if (request.params.user_id) {
    db.User.update({
      updateObject,
      where: {
        id: request.params.user_id,
        $and: [
          {
            nick: { $ne: updateObject.nick }
          }
        ]
      }
    })
      .then(response => {
        console.log(response);
        // return ReS(response, { message: 'User updated', user:  } ,200);
      })
      .catch(() => {
        return ReE(response, 'Error with update user', 400);
      });
  }
}
module.exports.update = update;

const remove = async (request, response) => {
  let user, error;

  [error, user] = await to(user.destroy());

  if (error) {
    return ReE(response, 'Error when trying to delete user');
  }

  return ReS(response, { message: 'Deleted user' }, 204);
}
module.exports.remove = remove;

const login = async (request, response) => {
  const body = request.body;
  let user, error;

  [error, user] = await to(authService.authUser(request.body));

  if (error) {
    return ReE(response, error, 422);
  }
  return ReS(response, { token: user.getJWT(), user: user.toWeb() });
}
module.exports.login = login;
