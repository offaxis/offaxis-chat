// Importing Passport, strategies, and config
import passport from 'passport';
import User from './models/user';
import passportjwt from 'passport-jwt';
import LocalStrategy from 'passport-local';
import serverConfig from './config';

const JwtStrategy = passportjwt.Strategy;
const ExtractJwt = passportjwt.ExtractJwt;

// Setting up local login strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false, { error: 'Your login details could not be verified. Please try again.' });
        }

        user.comparePassword(password, function(err, isMatch) {
            if(err) {
                return done(err);
            }
            if(!isMatch) {
                return done(null, false, { error: "Your login details could not be verified. Please try again." });
            }
            return done(null, user);
        });
    });
});

// Setting up JWT login strategy
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    // fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
    // Telling Passport where to find the secret
    secretOrKey: serverConfig.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    User.findOne({ cuid: payload.cuid }, function(err, user) {
        if(err) {
            return done(err, false);
        }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
