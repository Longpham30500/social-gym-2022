let users = [];

const SocketServer = (socket) => {
  // Chat
  socket.on("createMessage", (message) => {
    console.log(message);
    const user = users.find((user) => user.id === message.recipient);
    user &&
      socket.to(`${user.socketId}`).emit("createMessageToClient", message);
  });
  // connect and disconnect
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId !== socket.id);
  });
  socket.on("addUser", (id) => {
    users.push({ id, socketId: socket.id });
  });
};

module.exports = SocketServer;
