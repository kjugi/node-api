const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt  = require('passport-jwt').ExtractJwt,
      user        = require('../models').user;

module.exports = (passport) => {
  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    let error, newUser;

    [error, newUser] = await to(newUser.findById(jwt_payload.id));
    console.log('user', newUser.id);

    if (error) {
      return done(error, false);
    }

    if (newUser) {
      return done(null, newUser);
    }
    else {
      return done(null, false);
    }
  }));
}
