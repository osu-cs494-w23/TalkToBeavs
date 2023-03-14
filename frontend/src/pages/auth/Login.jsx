import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import ttb from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, selectUser } from "../../redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const error = useSelector((state) => state.user.error);
  const [password, setPassword] = useState("");
  const [loginError, setError] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    if (!e.target.clickedOnce) {
      // First click event
      //console.log("Button clicked once");
      
      // Programmatically trigger a second click event after a short delay
      setTimeout(() => {
        const event = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        e.target.clickedOnce = true;
        e.target.dispatchEvent(event);
        
      }, 1);
    }
  };
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
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <Input
              variant="filled"
              mb={3}
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant="filled"
              mb={3}
              autoComplete="current-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width="full"
              mt={4}
              colorScheme="orange"
              isLoading={user.isLoading}
              loadingText="Logging in..."
              onClick={async (e) => {
                const values = {
                  email,
                  password,
                };

                try {
                  setLoading(true);
                  dispatch(loginUser(values));
                  {handleClick(e)}

                  if (user.error === "Login Failed" || user.error === null) {
                    setTimeout(() => {
                      setError("Login Failed");
                      setLoading(false);
                      e.target.clickedOnce = false;
                    }, 2000);
                  }

                  if (user.user !== null) {
                    console.log(user.isLoading)
                    setTimeout(() => {
                      setResponse("Login Successful");
                      setLoading(false);
                      console.log(user.user)
                      navigate("/home");
                    }, 2000);
                  }
                } catch (error) {
                  setLoading(false);
                  setError("Login Failed");
                  e.target.clickedOnce = false;
                }
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box textAlign="center">
          {user.error && (
            <Text mt={4} textAlign="center" color="red.500">
              {user.error}
            </Text>
          )}
          {response && (
            <Text mt={4} textAlign="center" color="green.500">
              {response}
            </Text>
          )}
        </Box>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link style={{ color: "#DE6A1F" }} to="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
