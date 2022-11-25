let users = [];

const SocketServer = socket => {
  // connect and disconnect 
  socket.on('addUser', id => {
      users.push({id, socketId : socket.id})
  })
  socket.on('disconnect', () => {
      users = users.filter(user => user.socketId !== socket.id)
  })

  // Chat 
  socket.on("createMessage", message => {
      const user = users.find(user => user.id === message.recipient)
      user && socket.to(`${user.socketId}`).emit("createMessageToClient", message)
  })
}
module.exports = SocketServer;
