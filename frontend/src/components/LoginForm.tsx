"use client"
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FormSpinner from "./FormSpinner";
import Forget from "./Forget";
import { login } from "@/libs/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PassInput from "./PassInput";
import Cookie from "js-cookie";

const LoginForm = () => {
  const router = useRouter();
  const [pending, setpending] = useState(false);
  const [forget, setforget] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setpending(true);
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    const response = await login(email, password);

    if (response.success) {
      toast.success("User login successful");
      const token = response.message.token;
      Cookie.set("token", token, {
        expires: 48 * 60 * 60 * 1000,
        path: "/",
        secure: true,
        sameSite: "None",
      });
      router.push("/home");
    } else {
      toast.error(response.message);
      setpending(false);
    }
  };

  return (
    <Box
      w={["80vw", "60vw", "60vw", "22vw"]}
      minW="280px"
      position="absolute"
      pointerEvents="all"
      backgroundColor="#00000040"
      backdropFilter="blur(6px)"
      px={6}
      py={7}
      border="1px solid rgba(173, 216, 230, 0.4)"
      rounded="2xl"
      boxShadow="0 0 30px rgba(0, 191, 255, 0.6)"
      transition="0.3s ease"
      _hover={{ boxShadow: "0 0 40px rgba(0, 255, 255, 0.8)" }}
    >
      {!forget ? (
        <form onSubmit={handleSubmit}>
          <Heading
            color="cyan.100"
            textAlign="center"
            mb={4}
            fontSize="2xl"
            textShadow="0 0 10px rgba(0,255,255,0.4)"
          >
            Welcome Aboard
          </Heading>
          <VStack spacing={5} color="white">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                isRequired
                bg="rgba(255,255,255,0.05)"
                border="1px solid rgba(255,255,255,0.15)"
                _hover={{ borderColor: "cyan.300" }}
                _focus={{ borderColor: "cyan.400", boxShadow: "0 0 0 1px cyan" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <PassInput />
            </FormControl>
            <Button
              variant="link"
              size="sm"
              color="blue.300"
              _hover={{ textDecoration: "underline" }}
              onClick={() => setforget(true)}
            >
              Forgot Password?
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              bgGradient="linear(to-r, cyan.400, blue.500)"
              _hover={{ bgGradient: "linear(to-r, blue.500, cyan.400)" }}
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
      ) : (
        <Forget />
      )}

      {pending && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          h="100%"
          top={0}
          left={0}
          position="absolute"
          backdropFilter="blur(4px)"
          bgColor="rgba(0, 191, 255, 0.1)"
          rounded="inherit"
        >
          <FormSpinner />
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;
