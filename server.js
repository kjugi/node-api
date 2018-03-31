const app  = require('./app'),
      port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
