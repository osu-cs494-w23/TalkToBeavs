import React from "react";
import { Text, Heading, Flex, Box } from "@chakra-ui/react";
import io from "socket.io-client";

const VideoLobby = () => {
  const socket = io("http://localhost:8080", {
    forceNew: false,
  });

  React.useEffect(() => {
    socket.emit("joinQueue", { name: "tom" });
  }, []);
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.100"
    >
      <Heading textAlign={"center"}>Video Lobby</Heading>
      <Text py={4} textAlign={"center"} w={"fit-content"}>
        Waiting for other user to join...
      </Text>
    </Flex>
  );
};

export default VideoLobby;
