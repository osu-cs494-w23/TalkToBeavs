import React from "react";
import Post from "../../components/Posts";
import {
  Text,
  Heading,
  Flex,
  Box,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";

import { setAllPosts, selectAllPosts } from "../../redux/slices/FeedSlice";
import OnlineUser from "../../components/OnlineUser";

//TODO: fetch this data from the store/MongoDB using setAllPosts to fetch all the existing post data and
// selectAllPosts to get it from the store. We need to figure out whether we want to do the business MongoDB logic
// within the store or here within the component
const posts = [
  {
    _id: 0,
    content: "This is my first post",
    rating: 0,
    postedBy: "artem",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 0,
    content: "This is my first post",
    rating: 0,
    postedBy: "artem",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
  {
    _id: 1,
    content: "This is my first post",
    rating: 3,
    postedBy: "colby",
    createdAt: "1/1/2023",
  },
];

function Home() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <Flex w="100%" h="100vh" direction="column" justify="center">
      <OnlineUser />

      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Text
          ml={2}
          textAlign="center"
          fontSize={{
            base: "3xl",
            md: "4xl",
            lg: "5xl",
            xl: "6xl",
          }}
          fontWeight="bold"
          w={{ md: "100%" }}
        >
          The
          <Text as={"span"} mx={2} color={"orange.500"}>
            Beaver
          </Text>
          Feed
        </Text>
        <Divider w={"50%"} mb={4} />
      </Box>
      <Box h={"100vh"} overflow={"scroll"}>
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </Box>
    </Flex>
  );
}

export default Home;
