const photo = require('../modles').photo;

let photos = async (request, response, next) => {
  let photoId, error, photoLink;

  photoId = request.params.photo_id;

  [error, photoLink ] = await to(photo.findOne({ where: { id: photo_id } }));

  if (error) {
    return ReE(response, 'error when searching for photo');
  }

  if (photoLink) {
    return ReE(response, `Photo with specified id: ${photoId}`);
  }

  request.photoLink = photoLink;
  next();
}
module.exports.photos = photos;
