const photo = require('../models').photo;

const create = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');
}
module.exports.create = create;

const get = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');
}
module.exports.get = get;

const update = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');
}
module.exports.update = update;

const remove = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');
}
module.exports.remove = remove;
