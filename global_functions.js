to = (promise) => {
  return promise
    .then( data => {
      return [null, data];
    })
    .catch( err => {
      [pe(err)]
    });
}

pe = require('parse-error');

// Throw error
TE = (error_message, log) => {
  if (log === true) {
    console.log(error_message);
  }

  throw new Error(error_message);
}

// Error web response
ReE = (response, error, code) => {
  const returnedErroObj = {
    url: response.req.originalUrl,
    method: response.req.method,
    success: false
  };

  if (typeof error == 'object' && typeof error.message != 'undefined') {
    returnedErroObj.message = error.message;
  }

  if (typeof code !== 'undefined') {
    returnedErroObj.code = code;
  }

  return response.json(returnedErroObj);
}

// Success web response
ReS = (response, data, code) => {
  let sendData =  { success: true };

  if (typeof data == 'object') {
    sendData = Object.assign(data, sendData);
  }

  if (typeof code !== 'undefined') {
    sendData.code = code;
  }

  return response.json(sendData);
}

// Handle other promises
process.on('unhandledRejection', error => {
  console.error('Unaught error', pe(error));
});
