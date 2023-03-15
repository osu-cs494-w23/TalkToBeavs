import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Input,
    Text,
} from '@chakra-ui/react'
import axios from 'axios'
import ttb from '../../assets/logo.png'
import io from 'socket.io-client'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, selectUser } from '../../redux/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'

function Signup() {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [response, setResponse] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const handleClick = (e) => {
        if (!e.target.clickedOnce) {
            // First click event
            //console.log("Button clicked once");

            // Programmatically trigger a second click event after a short delay
            setTimeout(() => {
                const event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                })
                e.target.clickedOnce = true
                e.target.dispatchEvent(event)
            }, 1)
        }
    }

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="gray.100"
        >
            <Box
                p={8}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Box textAlign="center">
                    <Heading>Sign Up</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form>
                        <Input
                            variant="filled"
                            mb={3}
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            variant="filled"
                            mb={3}
                            type="text"
                            autoComplete="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            variant="filled"
                            mb={3}
                            type="password"
                            autoComplete="current-password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            width="full"
                            mt={4}
                            colorScheme="orange"
                            isLoading={isLoading}
                            loadingText="Submitting"
                            onClick={async (e) => {
                                e.preventDefault()
                                setIsLoading(true)
                                setError('')
                                setResponse('')
                                const values = {
                                    email,
                                    name,
                                    password,
                                }
                                try {
                                    await dispatch(registerUser(values))
                                    {
                                        handleClick(e)
                                    }
                                    setIsLoading(false)
                                    // console.log(user)
                                    if (
                                        user.message !== null &&
                                        user.message !== undefined
                                    ) {
                                        setTimeout(() => {
                                            setIsLoading(false)
                                            navigate('/login')
                                        }, 2000)
                                    } else {
                                        setTimeout(() => {
                                            setError('Register Failed')
                                            setIsLoading(false)
                                            e.target.clickedOnce = false
                                        }, 2000)
                                    }
                                    //console.log()
                                } catch (error) {
                                    //setError(error.response.data.message);
                                    console.log(error)
                                    setTimeout(() => {
                                        setError(error)
                                        setIsLoading(false)
                                        e.target.clickedOnce = false
                                    }, 2000)
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
                {error && (
                    <Text mt={4} textAlign="center" color="red.500">
                        {error}
                    </Text>
                )}
                {response && (
                    <Text mt={4} textAlign="center" color="green.500">
                        {response}
                    </Text>
                )}
                <Text mt={4} textAlign="center">
                    Already have an account?{' '}
                    <Link style={{ color: '#DE6A1F' }} to="/login">
                        Login
                    </Link>
                </Text>
            </Box>
        </Flex>
    )
}

export default Signup
