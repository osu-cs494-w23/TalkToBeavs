import React from 'react'
import { IconButton, Flex, Box, Text } from '@chakra-ui/react'
import { CheckIcon, AddIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import useOnlineUsers from '../hooks/useOnlineUsers'
import axios from 'axios'
import { selectIsFollowing, selectUser } from '../redux/slices/UserSlice'

// Current user can follow/unfollow the props.user
export default function FollowButton({ user }) {
    // const loggedInUser = useSelector(selectUser)
    const isFollowing = useSelector(selectIsFollowing(user.email))
    console.log(isFollowing)
    // console.log(isFollowing)
    // const [setIsFollowing] = React.useState(isFollowing)



    const handleFollow = async (e) => {
        e.preventDefault()
        const req = {
            currentUserEmail: loggedInUser.email,
            email: user.email,
        }
        const response = await axios.post("http://localhost:8080/api/social/follow_user", req)

        console.log(response.data)
    }

    return (
        <div>ghi</div>
    )



    // return loggedInUser && (
    //     <Flex>
    //         <Box my={6}>
    //             <IconButton
    //                 onClick={handleFollow}
    //                 aria-label="Follow"
    //                 icon={
    //                     isFollowing ? (
    //                         <>
    //                             <Flex
    //                                 direction="row"
    //                                 gap={2}
    //                                 mx={2}
    //                                 align="center"
    //                                 justify="center"
    //                                 w="100%"
    //                                 h="100%"

    //                             >
    //                                 <Text ml={2} fontSize="sm">
    //                                     Following
    //                                 </Text>
    //                                 <CheckIcon />
    //                             </Flex>
    //                         </>
    //                     ) : (
    //                         <>
    //                             <Flex
    //                                 direction="row"
    //                                 gap={2}
    //                                 mx={2}
    //                                 align="center"
    //                                 justify="center"
    //                                 w="100%"
    //                                 h="100%"
    //                             >
    //                                 <Text ml={2} fontSize="sm">
    //                                     Follow
    //                                 </Text>
    //                                 <AddIcon />
    //                             </Flex>
    //                         </>
    //                     )
    //                 }
    //             ></IconButton>
    //         </Box>
    //     </Flex>
    // )
}
