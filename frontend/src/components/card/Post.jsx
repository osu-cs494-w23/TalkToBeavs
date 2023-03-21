import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { Box, Flex, IconButton, Spacer, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { upvotePostAsync, downvotePostAsync } from '../../redux/slices/FeedSlice'
import moment from 'moment';

const Post = ({ post }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const token = localStorage.getItem('token');
  const onid = token?.split('@')[0];

  useEffect(() => {
    if (post.upvotes && post.upvotes.includes(onid)) {
      console.log("post.upvotes:", post.upvotes)
      setIsUpvoted(true);
    } else if (post.downvotes && post.downvotes.includes(onid)) {
      setIsDownvoted(true);
    }
  }, [post.upvotes, post.downvotes]);
  
  const dispatch = useDispatch();

  const handleUpvote = () => {
    if (isUpvoted === false) {
      if (isDownvoted) {
          //if its downvoted and they upvote do +2 instead of +1
          dispatch(upvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: true, onid: onid}))
          setIsDownvoted(false)
      } else {
        dispatch(upvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: false, onid: onid}))
        setIsUpvoted(true)
      }
    } else {
        dispatch(upvotePostAsync({ postId: post._id, isUpvoted: true, isDownvoted: false, onid: onid}))
        setIsUpvoted(false)
    }
  }

  const handleDownvote = () => {
    if (isDownvoted === false) {
      if (isUpvoted /* or post.upvotes && post.upvotes.includes(onid)*/) {
          //if its upvoted and they downvote do -2 instead of -1
          dispatch(downvotePostAsync({ postId: post._id, isUpvoted: true, isDownvoted: false, onid: onid}))
          setIsUpvoted(false)
      } else {
        dispatch(downvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: false, onid: onid}))
        setIsDownvoted(true)
      }
    } else {
        dispatch(downvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: true, onid: onid}))
        setIsDownvoted(false)
    }
  }

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={3}
      _hover={{ shadow: 'lg' }}
      w='70%'
      maxW={isMobile ? '100%' : '60%'}
      margin='0 auto'
      marginBottom={6}
    >
      <Text fontSize='lg' fontWeight='bold' mb={2}>
        {post.content}
      </Text>

      <Flex alignItems='center' mb={2}>
        <Text fontSize='sm' color='gray.500'>
          {moment(post.createdAt).calendar()}
        </Text>
        <Spacer />
      </Flex>

      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Tooltip label='Upvote' aria-label='Upvote'>
            <IconButton
              icon={<ArrowUpIcon />}
              variant='ghost'
              size='sm'
              colorScheme={isUpvoted ? 'green' : 'gray'}
              onClick={handleUpvote}
              mr={2}
            />
          </Tooltip>

          <Text fontSize='sm' color='gray.500' mr={2}>
            {post.upvotes.length - post.downvotes.length}
          </Text>

          <Tooltip label='Downvote' aria-label='Downvote'>
            <IconButton
              icon={<ArrowDownIcon />}
              variant='ghost'
              size='sm'
              colorScheme={isDownvoted ? 'red' : 'gray'}
              onClick={handleDownvote}
              ml={2}
            />
          </Tooltip>
        </Flex>

        <Box textAlign='right'>
          <Text fontSize='sm' color='gray.500'>
            {post.postedBy.split('@')[0]}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;