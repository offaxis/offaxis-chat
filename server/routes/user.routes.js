import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as AuthController from '../controllers/auth.controller';

import passport from 'passport';
import passportService from '../passport';

const router = new Router();

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

router.get('/users', requireAuth, UserController.getUsers);

router.get('/user/getjoinedrooms', requireAuth, UserController.getJoinedRooms);

router.get('/user/getloggeduser', requireAuth, AuthController.isLoggedIn);

router.post('/user/login', requireLogin, AuthController.login);

router.route('/user/register').post(AuthController.register);


export default router;
