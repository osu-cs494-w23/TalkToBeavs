import React from "react";
import Post from "../../components/Post";
import { Text, Heading, Flex, Box } from "@chakra-ui/react";

import { setAllPosts, selectAllPosts } from "../../redux/slices/FeedSlice";

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
];

function Home() {
  return (
    <Flex w="100%" direction="column" justify="center" pt={150}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Flex>
  );
}

export default Home;
