import User from '../models/user';
import Room from '../models/room';

export function getUsers(req, res) {
    User.find().sort('name').exec((err, users) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({users});
    })
  // return res.status(200).end();
}


export function getJoinedRooms(req, res) {
    if(req.user) {
        Room.find({participants: req.user.cuid}).exec((error, rooms) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.json({rooms: rooms});
        });
    }
}
