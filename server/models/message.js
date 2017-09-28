import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var messageUserSchema = new mongoose.Schema({
    cuid: { type: 'String', required: true },
    name: { type: 'String', required: true }
});

var messageRoomSchema = new mongoose.Schema({
    cuid: { type: 'String', required: true },
    title: { type: 'String', required: true }
});

const messageSchema = new Schema({
    cuid: { type: 'String', required: true },
    user: { type: messageUserSchema, required: true },
    room: { type: messageRoomSchema, required: true},
    content: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Message', messageSchema);
