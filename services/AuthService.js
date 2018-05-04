const user      = require('./../models').user,
      validator = require('validator');

const getUniqueKeyFromBody = (body) => {
  let uniqueKey = body.unique_key;

  if (typeof uniqueKey === 'undefined') {
    if (typeof body.nick != 'undefined') {
      uniqueKey = body.nick;
    }
    else {
      uniqueKey = null;
    }
  }

  return uniqueKey;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async (userInfo) => {
  let uniqueKey, authInfo, error;

  authInfo = {};
  authInfo.status = 'create';

  uniqueKey = getUniqueKeyFromBody(userInfo);

  if (!uniqueKey) {
    TE('Necessary data are missed');
  }

  authInfo.method = 'nick';
  userInfo.nick = uniqueKey;

  [error, user] = await to(user.create(userInfo));

  if (error) {
    TE('user already exist');
  }

  return user;
}
module.exports.createUser = createUser;

const authUser = async (userInfo) => {
  let uniqueKey, authInfo;

  authInfo = {};
  authInfo.status = 'login';
  uniqueKey = getUniqueKeyFromBody(userInfo);

  if (!uniqueKey) {
    TE('Please enter nick to login');
  }

  let user, error;

  authInfo.method = 'nick';
  [error, user] = await to(user.findOne({ where: { nick: uniqueKey }}));

  console.log(error, user, uniqueKey);

  if (error) {
    return TE(error.message);
  }

  if (!user) {
    return TE('not registered');
  }

  return user;
}
module.exports.authUser = authUser;
