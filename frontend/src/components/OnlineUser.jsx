import React from 'react'

import {
    Text,
    Heading,
    Flex,
    Box,
    AbsoluteCenter,
    Avatar,
    AvatarBadge,
    AvatarGroup,
} from '@chakra-ui/react'
import UserAvatar from './UserAvatar'
import usersJson from '../data/users.json'
import useOnlineUsers from '../hooks/useOnlineUsers'

const OnlineUser = () => {
    const [users, fetchUsers] = useOnlineUsers()

    return (
        users && (
            <Box
                top={'0'}
                pos={'fixed'}
                right={'0'}
                display={{
                    base: 'none',
                    md: 'block',
                    lg: 'block',
                    xl: 'block',
                }}
                w={{ base: '200px', md: '20%', lg: '18%', xl: '15%' }}
                bg={'orange.100'}
                borderStartRadius={'xl'}
                overflow={'scroll'}
                px={2}
                py={2}
                h={'100vh'}
            >
                <Text
                    textAlign="center"
                    fontSize={{ base: 'md', md: 'md', lg: 'xl', xl: '2xl' }}
                    fontWeight="bold"
                    w={{ md: '100%' }}
                >
                    Online
                    <Text as={'span'} mx={1} color={'orange.500'}>
                        Beavers
                    </Text>
                </Text>

                <Box>
                    {users.map((user, i) => (
                        <UserAvatar key={i} user={user} />
                    ))}
                </Box>
            </Box>
        )
    )
}

export default OnlineUser
