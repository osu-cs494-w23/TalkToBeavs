import React from 'react'
import Post from '../../components/Posts'
import {
    Text,
    Heading,
    Flex,
    Box,
    useMediaQuery,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    ModalBody,
    Button,
    ModalCloseButton,
    Divider,
    IconButton,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import { setAllPosts, selectAllPosts } from '../../redux/slices/FeedSlice'
import OnlineUser from '../../components/OnlineUser'
import CreatePostModal from '../../components/CreatePostModal'

//TODO: fetch this data from the store/MongoDB using setAllPosts to fetch all the existing post data and
// selectAllPosts to get it from the store. We need to figure out whether we want to do the business MongoDB logic
// within the store or here within the component
const posts = [
    {
        _id: 0,
        content: 'This is my first post',
        rating: 0,
        postedBy: 'artem',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 0,
        content: 'This is my first post',
        rating: 0,
        postedBy: 'artem',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
    {
        _id: 1,
        content: 'This is my first post',
        rating: 3,
        postedBy: 'colby',
        createdAt: '1/1/2023',
    },
]

function Home() {
    const [isMobile] = useMediaQuery('(max-width: 500px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex w="100%" h="100vh" direction="column" justify="center">
            <OnlineUser />

            <Box
                display={'flex'}
                gap={24}
                flexDirection={'row'}
                alignSelf={'center'}
            >
                <IconButton
                    aria-label="Create Post"
                    icon={<EditIcon />}
                    colorScheme="orange"
                    onClick={onOpen}
                    size="lg"
                    my={6}
                    px={12}
                />

                <CreatePostModal isOpen={isOpen} onClose={onClose} />

                <Text
                    textAlign="center"
                    fontSize={{
                        base: '3xl',
                        md: '4xl',
                        lg: '5xl',
                        xl: '6xl',
                    }}
                    fontWeight="bold"
                    w={{ md: '100%' }}
                >
                    The
                    <Text as={'span'} mx={2} color={'orange.500'}>
                        Beaver
                    </Text>
                    Feed
                </Text>
                <Divider w={'50%'} mb={4} />
            </Box>
            <Box h={'100vh'} overflow={'scroll'}>
                {posts.map((post, i) => (
                    <Post key={i} post={post} />
                ))}
            </Box>
        </Flex>
    )
}

export default Home
