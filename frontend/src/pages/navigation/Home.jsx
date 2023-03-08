import React from "react";
import {
  Button,
  Text,
  Heading,
  Flex,
  Box,
  Image,
  HStack,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import ttb from "../../assets/zyro-image.png";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import OnlineUser from "../../components/OnlineUser";

const Home = () => {
  const [name, setName] = React.useState("");
  const socket = io("http://localhost:8080");
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
      socket.emit("newUser", { username: "test", id: socket.id });
    });

 
    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      // Remove user from the list
      socket.emit("removeUser", { username: "test", id: socket.id });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newUserResponse");
      socket.off("removeUserResponse");
      socket.removeAllListeners();
    };
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.100"
    >
      <Image src={ttb} alt="ttb" height="150px" pos={"absolute"} top={0} />
      <HStack>
        <OnlineUser socket={socket} />
        <Box
          p={8}
          maxWidth="400px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading textAlign={"center"}>Home</Heading>
          <Text py={4} textAlign={"center"} w={"fit-content"}>
            In TalkToBeavs, you can either text or video chat with other
            students. You can also post to the bulletin board and see what other
            students are posting.{" "}
            <b>
              <i>Enjoy!</i>
            </b>
          </Text>
          <Input
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <ButtonGroup mt={4} spacing={4} w={"full"} justifyContent={"center"}>
            <Button colorScheme="blue" variant="outline">
              <Link to="/video">Video Chat</Link>
            </Button>
            <Button colorScheme="blue" variant="outline">
              <Link to="/text">Text Chat</Link>
            </Button>
          </ButtonGroup>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Home;
