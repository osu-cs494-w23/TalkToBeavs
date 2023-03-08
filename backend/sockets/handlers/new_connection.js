import * as queue_options from "./queue_options.js";
/*
      This is the handler for a new connection.
      It will be called when a new connection is made to the server.

      We can use this to log the connection and disconnect events.
*/

const users = [];

const newConnection = (socket, io) => {
  console.log(`[Backend ⚡️]: New Connection: ${socket.id}`);
  
  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });
  
  socket.on("removeUser", (data) => {
    users.splice(users.indexOf(data), 1);
    io.emit("removeUserResponse", users);
  });
  
  socket.on("disconnect", () => {
    console.log(`[Backend ⚡️]: Disconnected!`);
    socket.broadcast.emit("removeUserResponse", users);
  });
  
  // Add the queue options handler
  queue_options.default(socket, io);
};

export default newConnection;
