const photo = require('../models').photo;

const create = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  let error, addPhoto;

  let user = request.user;
  let photoData = request.body;

  [error, addPhoto] = await to(photo.create(photoData));

  if (error) {
    return ReE(response, error, 422);
  }

  addPhoto.addUser(user, { through: { status: 'started' } });

  [error, addPhoto] = await to(addPhoto.save());

  if (error) {
    return ReE(response, error, 422);
  }

  let addPhotoJSON = addPhoto.toWeb();
  addPhotoJSON.photos = [{ user: user.id }];

  return ReS(response, { photo: addPhotoJSON }, 201);
}
module.exports.create = create;

const get = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  let photo = response.photo;

  return ReS(response, { photo: photo.toWeb() });
}
module.exports.get = get;

const update = async (request, response) => {
  let error, photo, data;

  photo = request.photo;
  data = request.body;
  photo.set(data);

  [error, photo] = await to(photo.save());

  if (error) {
    return ReE(response, error);
  }

  return ReS(response, { photo: photo.toWeb() });
}
module.exports.update = update;

const remove = async (request, response) => {
  let photo, error;

  photo = request.photo;

  [error, photo] = await to(photo.destroy());

  if (error) {
    return ReE(response, { message: 'Error when deleting photo from DB' });
  }

  return ReS(response, { message: 'Deleted Company'}, 204);
}
module.exports.remove = remove;
