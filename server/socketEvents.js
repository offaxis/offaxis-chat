exports = module.exports = function(io) {

    let connected_users = [];

    io.on('connection', function(socket) {


        socket.on('disconnect', (reason) => {
            var i = connected_users.indexOf(socket.user);
            if(i >= 0) {
                socket.broadcast.emit('userDisconnected', socket.user);
                connected_users.splice(i, 1);
            }
        });

        socket.on('userDisconnection', function() {
            var i = connected_users.indexOf(socket.user);
            if(i >= 0) {
                socket.broadcast.emit('userDisconnected', socket.user);
                connected_users.splice(i, 1);
            }
        });

        socket.on('userConnection', function(user) {
            socket.user = user;
            connected_users.push(user);
            socket.emit('connectedUsers', connected_users);
            socket.broadcast.emit('connectedUsers', connected_users);
        });

        socket.on('joinRoom', function(room) {
            if(room && room.cuid) {
                socket.join(room.cuid);
            }
        });

        socket.on('unJoinRoom', function(room) {
            if(room && room.cuid) {
                socket.leave(room.cuid)
            }
        });

        socket.on('addRoom', function(room) {
            socket.broadcast.emit('roomAdded', room);
        });

        socket.on('addMessage', function(message) {
            if(message && message.cuid) {
                socket.broadcast.to(message.room.cuid).emit('receiveMessage', message);
            }
        });

        socket.on('userIsWritting', function(user) {
            if(user && user.activeRoom) {
                socket.broadcast.to(user.activeRoom.cuid).emit('userIsWritting', user);
            }
        });

        socket.on('userStopWritting', function(user) {
            if(user && user.activeRoom) {
                socket.broadcast.to(user.activeRoom.cuid).emit('userStopWritting', user);
            }
        });

        // socket.on('chat mounted', function(user) {
        //     // TODO: Does the server need to know the user?
        //     socket.emit('receive socket', socket.id)
        // });
        //
        // socket.on('join channel', function(channel) {
        //     socket.join(channel.name)
        // });
        //
        //
        // socket.on('new channel', function(channel) {
        //     socket.broadcast.emit('new channel', channel)
        // });
        //
        // socket.on('typing', function (data) {
        //     socket.broadcast.to(data.channel).emit('typing bc', data.user);
        // });
        //
        // socket.on('stop typing', function (data) {
        //     socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
        // });
        //
        // socket.on('new private channel', function(socketID, channel) {
        //     socket.broadcast.to(socketID).emit('receive private channel', channel);
        // });

    });
}
