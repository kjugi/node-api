const express    = require('express'),
      router     = express.Router(),
      bodyParser = require('body-parser');

router.use(bodyParser.json());

// POST new user
router.post('/', (request, response) => {

});

// GET all users
router.get('/', (request, response) => {
  response.connection.query('SELECT * from users', (error, results, fields) => {
    if (error) throw error;

		response.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

// GET one user
router.get('/:id', (request, response) => {

});

// DELETE user
router.delete('/:id', (request, response) => {

});

// PUT/UPDATE user
router.put('/:id', (request, response) => {

});

module.exports = router;
