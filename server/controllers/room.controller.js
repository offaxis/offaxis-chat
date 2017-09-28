import Room from '../models/room';
import User from '../models/user';
import Message from '../models/message';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import _ from 'lodash';

export function getRooms(req, res) {
    Room.find().exec((err, rooms) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({rooms});
    })
  // return res.status(200).end();
}

export function getRoom(req, res) {
    Room.findOne({ cuid: req.params.cuid }).exec((err, room) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ room });
    });
}

export function addRoom(req, res) {
    if(!req.body.room.title) {
      res.status(403).end();
    }

    const newRoom = new Room(req.body.room);

    // Let's sanitize inputs
    newRoom.title = sanitizeHtml(newRoom.title);
    newRoom.slug = slug(newRoom.title.toLowerCase(), { lowercase: true });
    newRoom.cuid = cuid();

    newRoom.save((error, saved) => {
        if(error) {
            res.status(500).send(error);
        }
        res.json({room: saved});
    });
}

export function joinRoom(req, res) {
    if(!req.body.room) {
        res.status(403).end();
    }
    Room.findOne({cuid: req.body.room}).exec((error, room) => {
        if(error) {
            return res.status(500).send(error);
        }

        if(!room.isUserParticipating(req.user.cuid)) {
            room.participants.addToSet(req.user.cuid);

            room.save((error, saved) => {
                if(error) {
                    res.status(500).send(error);
                }
                res.json({room: saved});
            });
        } else {
            return res.status(403).send({room: room, errors: [{type: 'error', message: 'Already in room'}]});
        }
    });
}

export function unJoinRoom(req, res) {
    if(!req.body.room) {
        res.status(403).end();
    }
    Room.findOne({cuid: req.body.room}).exec((error, room) => {
        if(error) {
            return res.status(500).send(error);
        }

        if(room.isUserParticipating(req.user.cuid)) {
            room.participants.pull(req.user.cuid);

            room.save((error, saved) => {
                if(error) {
                    res.status(500).send(error);
                }
                res.json({room: saved});
            });
        } else {
            return res.status(403).send({room: room, errors: [{type: 'error', message: 'Not in the room'}]});
        }
    });
}

export function getParticipants(req, res) {
    if(!req.params.cuid) {
        res.status(403).end();
    }
    Room.findOne({cuid: req.params.cuid}).exec((error, room) => {
        if(error) {
            return res.status(500).send(error);
        }
        User.find({cuid: {$in: room.participants}}).select('cuid name email').exec((error, participants) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.json({users: participants});

        })

    });
}

export function getMessages(req, res) {
    if(!req.params.cuid) {
        return res.status(403).end();
    }
    Room.findOne({cuid: req.params.cuid}).exec((error, room) => {
        if(error) {
            return res.status(500).send(error);
        }
        Message.find({'room.cuid': room.cuid}).exec((error, messages) => {
            if(error) {
                return res.status(500).send(error);
            }
            res.json({messages: messages});
        })
    });
}

export function addMessage(req, res) {
    if(!req.params.cuid || !req.body.user || !req.body.content) {
        return res.status(403).end();
    }
    Room.findOne({cuid: req.params.cuid}).exec((error, room) => {
        if(error) {
            return res.status(500).send(error);
        }
        const newMessage = new Message({
            user: {
                cuid: req.body.user.cuid,
                name: req.body.user.name
            },
            room: {
                cuid: room.cuid,
                title: room.title
            },
            content: req.body.content
        });

        newMessage.cuid = cuid();

        newMessage.save((error, message) => {
            if(error) {
                return res.status(500).send(error);
            }
            return res.json({message: message});
        });
    });
}
