"use client"
import { Box, FormControl, FormLabel, Input, Button, VStack, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import Otp from './Otp'
import ProfileForm from './ProfileForm'
import { register } from '@/libs/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import FormSpinner from './FormSpinner'
import PassInput from './PassInput'

const RegisterForm = () => {
  const [reg, setreg] = useState<string>('');
  const [email, setemail] = useState('');
  const [pending, setpending] = useState(false);
  const [otpsuccess, setotpsuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setpending(true);
    const formdata = new FormData(e.currentTarget);
    const password = formdata.get('password') as string;
    const email = formdata.get('email') as string;
    setemail(email);
    const response = await register(password, email);
    if (response) {
      setreg(response);
    } else {
      setreg('');
      toast.error('User already exists');
    }
    setpending(false);
  }

  return (
    <Box
      w={['85vw', '65vw', '50vw', '30vw']}
      maxW="95vw"
      minW="250px"
      position="relative"
      pointerEvents="all"
      px={6}
      py={8}
      border="2px"
      borderColor="cyan.400"
      borderRadius="xl"
      boxShadow="0 10px 40px rgba(0, 200, 255, 0.3)"
      bg="rgba(0, 20, 40, 0.6)"
      backdropFilter="blur(6px)"
      color="white"
    >
      {reg.length < 1 ? (
        <form onSubmit={handleSubmit}>
          <Heading size="lg" textAlign="center" mb={6} color="cyan.300">
            Register
          </Heading>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                bg="rgba(0, 0, 0, 0.3)"
                border="1px solid rgba(255, 255, 255, 0.2)"
                _placeholder={{ color: "gray.300" }}
                color="white"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <PassInput />
            </FormControl>

            <Button
              type="submit"
              bg="teal.400"
              _hover={{ bg: "teal.500" }}
              color="white"
              w="full"
              fontWeight="bold"
            >
              Register
            </Button>
          </VStack>
        </form>
      ) : !otpsuccess ? (
        <Otp otpsuccess={setotpsuccess} otp1={reg} email1={email} login={false} />
      ) : (
        <ProfileForm email={email} />
      )}

      {pending && (
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(0, 150, 200, 0.2)"
          backdropFilter="blur(4px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={10}
        >
          <FormSpinner />
        </Box>
      )}
    </Box>
  )
}

export default RegisterForm
