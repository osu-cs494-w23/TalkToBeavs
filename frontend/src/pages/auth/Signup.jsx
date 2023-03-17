import { useState, useEffect } from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Input,
    keyframes,
    Text,
} from '@chakra-ui/react'
import axios from 'axios'
import ttb from '../../assets/logo.png'
import io from 'socket.io-client'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { slideAnimation } from '../../lib/animations'

function Signup() {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [response, setResponse] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="gray.100"
            as={motion.div}
            animation={slideAnimation}
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
                    <form onSubmit={handleSubmit}>
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
                            type='submit'
                            onClick={handleSubmit}
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
