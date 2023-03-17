import React, { useEffect, useLayoutEffect, useState } from 'react'
import ttb from '../../assets/logo.png'
import {
    Text,
    Button,
    Box,
    useToast,
    useColorModeValue,
    useColorMode,
    Flex,
    Heading,
    Image,
    VStack,
} from '@chakra-ui/react'
import TalkToBeavs from '../../components/text/TalkToBeavs'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/slices/UserSlice'

export default function Logout() {
    const toast = useToast()

    const { colorMode, toggleColorMode } = useColorMode()
    const seconds = 2
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [timeLeft, setTimeLeft] = useState(seconds)

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    useEffect(() => {
        localStorage.removeItem('token')
        dispatch(logoutUser())

        if (timeLeft && window.location.pathname !== '/logout') {
            return
        }

        if (!timeLeft) {
            navigate('/login')
        } else if (!timeLeft && window.location.pathname !== '/logout') {
            return
        } else {
            setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000)
        return () => clearInterval(intervalId)
    })

    useLayoutEffect(() => {
        toast({
            title: 'Logged out',
            description: 'You have been logged out.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'bottom',
        })
    }, [])

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            w="100%"
            h="100%"
        >
            <Image src={ttb} h="100px" />
            <Heading as="h1" size="2xl" mt={16} textAlign={'center'}>
                Thank you for using
                <Box my={4}>
                    <TalkToBeavs />
                </Box>
            </Heading>
            <VStack spacing={4} align="center" justify="center">
                <Text
                    fontSize="2xl"
                    my={4}
                    fontWeight={'bold'}
                    textAlign={'center'}
                >
                    You are now signed out of your account. <br></br> You will
                    be redirected to the login page in {timeLeft} seconds.
                </Text>
                <Button
                    colorScheme="orange"
                    onClick={() => {
                        window.location.href = '/'
                    }}
                >
                    Login Again
                </Button>
            </VStack>
        </Flex>
    )
}
