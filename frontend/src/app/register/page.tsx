import React from 'react'
import { Text,Box, useDisclosure, Button } from '@chakra-ui/react'
import Submarine from '@/components/Submarine'
import RegisterForm from '@/components/RegisterForm'
import { ToastContainer } from "react-toastify";
import RippleBackground from '@/components/RegisterPage/RippleBackground'
const page = () => {
  return (
    <>
     <Box w={'100vw'} h={'100vh'} overflow={'hidden'} position='relative' bgSize={'cover'}>
     <RippleBackground/>
      <Box position={'absolute'} pointerEvents={'none'} top={0} left={0} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={'100vw'} height={'100vh'}>
      <Box h={'70vh'} w={'100vw'} p={0} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <RegisterForm/>
      </Box>
      <Box h={'30vh'} w={'100vw'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
        <Box pointerEvents={'all'}>
            <Submarine href='/login' label='Login Here'/>
   
        </Box>
      </Box>
      </Box>
    </Box>
    <ToastContainer />
    </>

  )
}

export default page