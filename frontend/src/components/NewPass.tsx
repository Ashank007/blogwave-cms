import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { FormControl, FormLabel, Button, VStack, Heading, HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { forgetpass } from '@/libs/auth'
import PassInput from './PassInput'
const NewPass = () => {
    const [forget, setforget] = useState(false)
    const [error, seterror] = useState(false);
    const [pass, setpass] = useState(false);
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const pass = formdata.get('pass') as string;
        const rpass = formdata.get('rpass') as string;
        if(pass==rpass){
           const response = await forgetpass(pass);
            setpass(response);
        }
        else{
            seterror(true);
        }
    }
  return (
    <>
    {forget?
    !pass?
        <>
        <Heading>New Password</Heading>
    <form onSubmit={handleSubmit}>
    <VStack>
        <FormControl>
            <FormLabel>New Password</FormLabel>
            <PassInput/>
        </FormControl>
        <FormControl>
            <FormLabel>Confirm New Password</FormLabel>
           <PassInput/>
        </FormControl>
        {error && <Text color='red'>Passwords not match</Text>}
        <Button type='submit' size={'md'} px={6} colorScheme='green'py={2} border={'2px solid rgba(0,255,0,0.3)'}>Save</Button>
    </VStack>
    </form>
        </>
        :
        <VStack spacing={5}>
        <Heading whiteSpace={'wrap'}>New password has been set!</Heading>
        <Link href={'/home'}>
        <Button colorScheme='green' p={2}>Go to Home page</Button>
        </Link>
        </VStack>
        :
        <VStack spacing={5}>
        <Heading whiteSpace={'wrap'}>OTP verified, Welcome back user!</Heading>
        <HStack spacing={4}>
        <Button colorScheme='green' whiteSpace={'wrap'} onClick={()=>setforget(true)}>Update Password</Button>
        <Link href={'/home'}>
        <Button colorScheme='green' whiteSpace={'wrap'} h={'fit-content'} p={2}>Go to Home</Button>
        </Link>
        </HStack>
        </VStack>
    }
    </>
  )
}

export default NewPass