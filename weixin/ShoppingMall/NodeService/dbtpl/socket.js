var io = require('socket.io');

/* socket监听 */
module.exports = function(app, server) {
    var listener = io.listen(server);
    listener.on('connection', function (socket) {
        socket.emit('connection', 'server connection success... ...');
        socket.on('disconnect', function () {
            console.log('disconnect... ...');
        });
        socket.on('message', function (data) {
            console.log('broadcast ... ...');
            socket.emit('message', data);
        });
    })
};