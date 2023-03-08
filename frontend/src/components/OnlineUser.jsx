import React from "react";

import { Text, Heading, Flex, Box } from "@chakra-ui/react";

const OnlineUser = ({ socket }) => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    socket.on("newUserResponse", (data) => {
      setUsers(data);
    });

    socket.on("removeUserResponse", (data) => {
      setUsers(data);
    });
  }, []);

  return (
    <Box p={8} maxWidth="400px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading textAlign={"center"}>Online Users</Heading>
      <Flex direction="column" overflow={"auto"} h={"300px"}>
        {users.map((user) => (
          <Text key={user.id}>
            {user.username} socketid: {user.id}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default OnlineUser;
