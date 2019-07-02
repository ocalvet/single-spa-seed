const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// expose this  to our app using module.exports
module.exports = (passport, config) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter('token')
  ]);
  opts.secretOrKey = config.tokenSecret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      return done(null, { ...jwt_payload });
    })
  );
};
