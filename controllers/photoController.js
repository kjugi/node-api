const db          = require('../models'),
      authService = require('./../services/AuthService');

const create = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const body = request.body,
        bodyKeys = Object.keys(body),
        requiredFields = [
          'userID',
          'photoLink',
          'stadium',
          'tribune',
          'sector',
          'row',
          'place',
          'match'
        ];

  if (bodyKeys.length > 0) {
    requiredFields.forEach(field => {
      if (bodyKeys.includes(field)) {
        return true;
      }
      else {
        return ReE(response, `Missing required field: ${field}`, 400)
      }
    })
  }
  else {
    return ReE(response, 'Body is empty! Body can\'t be empty!', 400);
  }

  // Create or return photo
  db.Photos.findOrCreate({
    where: body
  })
    .spread(function(photo, created) {
      if (created) {
        return ReS(
          response,
          { message: 'Photo added', user: photo.get() },
          201
        );
      }
      else {
        return ReE(response, 'Error when adding photo to database!', 400);
      }
    });
}
module.exports.create = create;

const get = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.params.user_id && request.params.photo_id) {
    db.Photos.find({
      where: {
        userID: request.params.user_id,
        id: request.params.photo_id
      }
    })
      .then(result => {
        if (result !== null) {
          return ReS(response, { photo: result }, 200);
        }
        else {
          return ReE(response, 'Photo with provided ID and UserID not found', 404);
        }
      })
  }
  else {
    return ReE(response, 'Provide all required params', 400);
  }
}
module.exports.get = get;

const getAll = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.params.user_id) {
    db.Photos.findAll({
      where: {
        userID: request.params.user_id
      }
    })
      .then(result => {
        return ReS(response, { photos: result }, 200);
      })
      .catch(() => {
        return ReE(response, 'Photos with provided UserID not found', 404);
      });
  }
  else {
    return ReE(response, 'Provide required params', 400);
  }
}
module.exports.getAll = getAll;

const remove = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.params.user_id && request.params.photo_id) {
    db.Photos.destroy({
      where: {
        userID: request.params.user_id,
        id: request.params.photo_id
      }
    })
      .then(result => {
        if (result) {
          return ReS(
            response,
            { message: 'Deleted image with specified user ID and photo ID'},
            200
          );
        }
        else {
          return ReE(response, 'No images found for specified user ID and photo ID', 404);
        }
      })
  }
  else {
    return ReE(response, 'Provide required params', 400);
  }
}
module.exports.remove = remove;

const removeAll = async (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if (request.params.user_id) {
    db.Photos.destroy({
      where: {
        userID: request.params.user_id
      }
    })
      .then(result => {
        if (result) {
          return ReS(
            response,
            {
              message: `Deleted all photos for user with ID: ${request.params.user_id}`
            },
            200
          );
        }
        else {
          return ReE(
            response,
            'Error when deleting all images or there is no images for specified user ID',
            404
          );
        }
      })
  }
  else {
    return ReE(response, 'Provide required params', 400);
  }
}
module.exports.removeAll = removeAll;
