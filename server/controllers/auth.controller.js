import User from '../models/user';
import cuid from 'cuid';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config';


export function login(req, res) {
    if(!(req.body.email && req.body.password)) {
        res.status(403).end();
    }

    User.findOne({email: req.body.email/*, password: req.body.password*/}).exec((err, user) => {
        if(err) {
            res.status(500).send(err);
        }
        // res.json({user: user});
        var token = generateToken(user);
        if(token) {
            res.status(200).json({
                token: 'JWT ' + token,
                user: user
            });
        } else {
            res.status(500).send(err);
        }
    });
}


export function register(req, res) {
    if(!(req.body.email && req.body.password && req.body.name)) {
        res.status(403).end();
    }

    User.findOne({email: req.body.email}).exec((err, user) => {
        if(err) {
            res.status(500).send(err);
        } else if(!user) {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            });

            newUser.cuid = cuid();

            newUser.save((error, user) => {
                if (error) {
                    res.status(500).send(error);
                }
                // res.json({user: user});
                var token = generateToken(user);
                if(token) {
                    res.status(200).json({
                        token: 'JWT ' + token,
                        user: user
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        }
    });
}

export function isLoggedIn(req, res) {
    if(!req.user) {
        return res.status(500).json({error: 'Unauthorized'});
    }
    res.status(200).json({user: req.user, token : generateToken(req.user)});
}


// Role authorization check
export function roleAuthorization(requiredRole) {
    return function(req, res, next) {
        const user = req.user;

        User.findOne({cuid: user.cuid}).exec((err, foundUser) => {
            if(err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            // If user is found, check role.
            // if(getRole(foundUser.role) >= getRole(requiredRole)) {
            //     return next();
            // }
            return next();
            return res.status(401).json({ error: 'You are not authorized to view this content.' });
        });
    };
};


function generateToken(user) {
    if(user) {
        const userData = {
            cuid: user.cuid,
            email: user.email,
            role: user.role,
        };
        return jwt.sign(userData, config.secret, {
            expiresIn: 10080 // in seconds
        });
    }
    return null;
}
