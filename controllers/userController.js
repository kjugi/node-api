const user        = require('../models').user,
      db          = require('../models'),
      authService = require('./../services/AuthService');

const create = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const body = request.body;

  if (!body.id && !body.nick && !body.stadium && !body.tribune && !body.sector && !body.row && !body.place) {
    return ReE(response, 'You don\'t provide necessary data to create a user!');
  }
  else {
    let error, user;

    [error, user] = await to(authService.createUser(body));

    if (error) {
      return ReE(response, request, 422);
    }
    else {
      return ReS(response, { message: 'User created', user: user.toWeb(), token: user.getJWT()}, 201);
    }
  }
}
module.exports.create = create;

const get = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  let user = request.user;

  return ReS(response, { user: user.toWeb() });
}
module.exports.get = get;

const getAll = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  var users = db.sequelize.query("SELECT * FROM Users").then(result => {
    response.send(result);
    // return ReS(response, { userList: result.toWeb() });
  });
}
module.exports.getAll = getAll;

const update = async (request, response) => {
  let error, user, data;

  user = request.user;
  data = request.body;
  user.set(data);

  [error, user] = await to(user.save());

  if (error) {
    if (error.message === 'Validation error') {
      error = 'Nick is already in use';
    }

    return ReE(response, error);
  }
  return ReS(response, { message: `Update User: ${user.nick}`});
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
