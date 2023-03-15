import React from 'react'
import { IconButton, Flex, Box, Text } from '@chakra-ui/react'
import { CheckIcon, AddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'

// Current user can follow/unfollow the props.user
export default function FollowButton({ user }) {
    const currentUser = useSelector((state) => state.user)
    const [isFollowing, setIsFollowing] = React.useState(false)
    return (
        <Flex>
            <Box my={6}>
                <IconButton
                    aria-label="Follow"
                    icon={
                        isFollowing ? (
                            <>
                                <Flex
                                    direction="row"
                                    gap={2}
                                    mx={2}
                                    align="center"
                                    justify="center"
                                    w="100%"
                                    h="100%"
                                >
                                    <Text ml={2} fontSize="sm">
                                        Following
                                    </Text>
                                    <CheckIcon />
                                </Flex>
                            </>
                        ) : (
                            <>
                                <Flex
                                    direction="row"
                                    gap={2}
                                    mx={2}
                                    align="center"
                                    justify="center"
                                    w="100%"
                                    h="100%"
                                >
                                    <Text ml={2} fontSize="sm">
                                        Follow
                                    </Text>
                                    <AddIcon />
                                </Flex>
                            </>
                        )
                    }
                    onClick={() => setIsFollowing(!isFollowing)}
                ></IconButton>
            </Box>
        </Flex>
    )
}
