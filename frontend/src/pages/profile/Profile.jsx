import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    Text,
    Flex,
    Divider,
    Avatar,
    IconButton,
    HStack,
    VStack,
} from '@chakra-ui/react'
import OnlineUser from '../../components/OnlineUser'
import { useParams } from 'react-router-dom'
import Posts from '../../components/Posts'
import FollowButton from '../../components/FollowButton'
import { useDispatch } from 'react-redux'
import useProfile from '../../hooks/useProfile'

export default function Profile() {
    const { onid } = useParams()
    const dispatch = useDispatch()
    const profile = useProfile({ onid })

    return (
        profile && (
            <>
                <Box w="100%" h="100%" py={8}>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="100%"
                        h="100%"
                    >
                        <Avatar
                            size="2xl"
                            name={profile.name}
                            src={profile.avatarImg}
                            mb={4}
                        />
                        <FollowButton user={profile} />
                        <Heading as="h1" size="2xl" mb={4}>
                            {profile.name.charAt(0).toUpperCase() +
                                profile.name.slice(1)}
                        </Heading>
                        <Divider
                            w={{
                                base: '50%',
                                sm: '60%',
                                md: '50%',
                                lg: '55%',
                            }}
                            mb={4}
                        />

                        <HStack spacing={{ base: 36, sm: 12, md: 24, lg: 28 }}>
                            <Box
                                w={'8.5rem'}
                                textAlign={'center'}
                                transition={'all 0.3s ease-in-out'}
                                _hover={{
                                    boxShadow: {
                                        base: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                    },
                                    transform: 'scale(1.05)',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    borderRadius: '0.5rem',
                                    bg: {
                                        base: 'orange.500',
                                    },
                                }}
                            >
                                <Text fontSize="xl" fontWeight="bold">
                                    Followers
                                </Text>
                                <Text fontSize="xl" fontWeight="bold">
                                    {profile.followers.length}
                                </Text>
                            </Box>

                            <Divider orientation="vertical" h="100px" />

                            <Box
                                w={'8.5rem'}
                                textAlign={'center'}
                                transition={'all 0.3s ease-in-out'}
                                _hover={{
                                    boxShadow: {
                                        base: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                    },
                                    transform: 'scale(1.05)',
                                    padding: '0.5rem',
                                    cursor: 'pointer',
                                    borderRadius: '0.5rem',
                                    bg: {
                                        base: 'orange.500',
                                    },
                                }}
                            >
                                <Text fontSize="xl" fontWeight="bold">
                                    Following
                                </Text>
                                <Text fontSize="xl" fontWeight="bold">
                                    {profile.following.length}
                                </Text>
                            </Box>
                        </HStack>
                        <Divider
                            w={{
                                base: '50%',
                                sm: '60%',
                                md: '50%',
                                lg: '55%',
                            }}
                            mb={4}
                        />
                        <Heading as="h2" size="lg" mt={8} mb={4}>
                            {onid}'s Posts
                            <Divider mt={2} />
                        </Heading>

                        <Box
                            w={{
                                base: '100%',
                                sm: '100%',
                                md: '80%',
                                lg: '100%',
                            }}
                            // h="100%"
                            my={8}
                        >
                            {profile.posts.map((post, i) => (
                                <Posts key={i} post={post} />
                            ))}
                        </Box>
                    </Flex>
                </Box>
            </>
        )
    )
}
