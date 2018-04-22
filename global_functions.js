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
  if (typeof error == 'object' && typeof err.message != 'undefined') {
    error = error.message;
  }

  if (typeof code !== 'undefined') response.statusCode = code;

  return response.json({ success: false, error: error });
}

// Success web response
ReS = (response, data, code) => {
  let sendData =  { success: true };

  if (typeof data == 'object') {
    sendData = Object.assign(data, sendData);
  }

  if (typeof code !== 'undefined') {
    response.statusCode = code;
  }

  return response.json(sendData);
}

// Handle other promises
process.on('unhandledRejection', error => {
  console.error('Unaught error', pe(error));
});
