import { Router } from 'express';
import * as RoomController from '../controllers/room.controller';
import passport from 'passport';
import passportService from '../passport';

const router = new Router();


// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
// const requireLogin = passport.authenticate('local', { session: false });

router.route('/rooms').get(RoomController.getRooms);

router.post('/rooms/add', requireAuth, RoomController.addRoom);

router.get('/rooms/:cuid', requireAuth, RoomController.getRoom);

router.post('/rooms/join', requireAuth, RoomController.joinRoom);

router.post('/rooms/unjoin', requireAuth, RoomController.unJoinRoom);

router.get('/rooms/:cuid/getparticipants', requireAuth, RoomController.getParticipants);

router.get('/rooms/:cuid/getmessages', requireAuth, RoomController.getMessages);

router.post('/rooms/:cuid/addmessage', requireAuth, RoomController.addMessage)

export default router;
