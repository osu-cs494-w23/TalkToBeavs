import * as queue_options from "./queue_options.js";
/*
      This is the handler for a new connection.
      It will be called when a new connection is made to the server.

      We can use this to log the connection and disconnect events.
*/

var users = [];

const newConnection = (socket, io) => {
  console.log(`[Backend ⚡️]: New Connection: ${socket.id}`);

  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", (socket) => {
    console.log(`[Backend ⚡️]: Disconnected!`);
    users.pop();
    io.emit("removeUserResponse", users);
  });

   socket.on("sdp", (data) => {
     socket.broadcast.emit("sdp", data);
   });

   socket.on("candidate", (data) => {
     socket.broadcast.emit("candidate", data);
   });

   socket.emit("connection", null);

  // Add the queue options handler
  queue_options.default(socket, io);
};

export default newConnection;
