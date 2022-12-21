"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const socketController = (socket) => {
    socket.on('mensaje', (payload) => {
        socket.broadcast.emit('vuelta', payload);
        socket.emit('vuelta', payload);
    });
};
exports.socketController = socketController;
//# sourceMappingURL=socketController.js.map