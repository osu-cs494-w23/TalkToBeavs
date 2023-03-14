import React from "react";
import {
  Avatar,
  Stack,
  AvatarBadge,
  Text,
  Box,
  AvatarGroup,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function UserAvatar({ user }) {
  const { name, avatarImg, online, email } = user;

  const onid = email.replace(/@.*/, "");
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      ml={2}
      my={6}
      onClick={() => navigate(`/profile/${onid}`, { state: { user: user } })}
    >
      <Flex
        direction="row"
        gap={12}
        textAlign={"left"}
        transition={"all 0.3s ease-in-out"}
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          transform: "scale(1.05)",
          padding: "0.5rem",
          cursor: "pointer",
          borderRadius: "0.5rem",
          bg: "orange.500",
        }}
      >
        <Avatar
          border={online ? "2px solid white" : "2px solid white"}
          size="sm"
          name={name}
          sx={{
            border: "2px solid white",
            boxShadow: "0 0 0 2px #fff",
          }}
          src={avatarImg}
        >
          <AvatarBadge
            boxSize="3"
            bg={online ? "green.500" : "gray.500"}
            offset={[-2, 2]}
            border={online ? "6px" : "0px"}
          />
        </Avatar>
        <Text align={"center"} transform={"translateX(-2.2rem)"}>
          {email.replace(/@.*/, "")}
        </Text>
      </Flex>
    </Stack>
  );
}
