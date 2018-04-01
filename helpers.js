module.exports = {
  checkRequest: (body, schema) => {
    let addUser = true,
        missingFields = [];

    Object.keys(schema).forEach((key) => {
      if (!body.hasOwnProperty(key)) {
        addUser = false;
        missingFields.push(key);
      }
    });

    return { addUser, missingFields };
  }
}
