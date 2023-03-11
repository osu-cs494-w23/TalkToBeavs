import React from "react";
import {
  Text,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";

const posts = 
[
	{
		_id: 0,
		content: "This is my first post",
		rating: 0,
		postedBy: "artem"
	},
	{
		_id: 1,
		content: "This is my first post",
		rating: 3,
		postedBy: "colby"
	},
	{
		_id: 2,
		content: "This is my first post",
		rating: 1,
		postedBy: "tom"
	},
	{
		_id: 3,
		content: "This is my first post",
		rating: 2,
		postedBy: "jeff"
	},
	{
		_id: 4,
		content: "This is my second post",
		rating: 1,
		postedBy: "colby"
	},
	{
		_id: 5,
		content: "This is my third post",
		rating: 0,
		postedBy: "colby"
	},
	{
		_id: 6,
		content: "This is my second post",
		rating: 0,
		postedBy: "artem"
	},
]

function Home()
{
	
	
	return (
        <Flex w="100%" direction="column" justify="center" pt={150}>
			{posts.map(post => (
				<Post key={post._id} post={post} />
			))}
		</Flex>
	)
}

export default Home;