import React, { Dispatch, SetStateAction, useState, Fragment, useRef, ChangeEvent, useEffect } from 'react'
import { Box, FormControl, FormLabel, Input, Button, VStack, Heading, Divider, HStack, Flex } from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { forgetotp, forgetotpSubmit, otpSubmit, resendOtp } from '@/libs/auth'
import Cookie from 'js-cookie'
type OtpProps={
    otpsuccess: Dispatch<SetStateAction<boolean>>;
    otp1?:string;
    email1: string;
    login:boolean
}
const MotionBox = motion(Box);
const Otp:React.FC<OtpProps> = ({otpsuccess,otp1,email1, login}) => {
    const [otpsent, setotpsent] = useState<number>(otp1?1:0);
    const [email, setemail] = useState(email1);
    const [placeholder, setplaceholder] = useState('')
    const [block, setblock] = useState(false)
    const [count, setcount] = useState<number|null>(null)
    const [otp, setotp] = useState(otp1??'');
    const [pin, setpin] = useState('');
    const handleSubmit = async ()=>{
        let response:boolean;
        if(login){
           const res = await forgetotpSubmit(pin);
            if(res.success){
                const token = res.message.token;
                Cookie.set('token', token, { expires: 48*60*60*1000, path: '/', secure: true, sameSite: 'None' });
            }
            response = res.success;
        }else{

        response = await otpSubmit(pin);
        }

        if(response){
            otpsuccess(true);
        }
        else{
            otpsuccess(false);
        }
    }
    const handleChange = async (value: string) => {
        setpin(value);
        if(value==otp){
            let response:boolean;
            if(login){
                const res = await forgetotpSubmit(value);
            if(res.success){
                const token = res.message.token;
                Cookie.set('token', token, { expires: 48*60*60*1000, path: '/', secure: true, sameSite: 'None' });
            }
            response = res.success;
            }else{
    
            response = await otpSubmit(value);
            }
            if(response){
                otpsuccess(true);
            }
            else{
                otpsuccess(false);
            }
        }
    }
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (count !== null && count > 0) {
          timer = setTimeout(() => setcount(count - 1), 1000);
        } else if (count === 0) {
          setblock(false);
          setcount(null);
        }
    
        return () => clearTimeout(timer);
      }, [count]);
    const handleClick = async ()=>{
        setblock(true);
        setcount(60);
        if(email.length>0){
            const response = await forgetotp(email);
            setotp(response);
            setotpsent(prev=>prev+1);
        }
        else{
            setplaceholder('Enter email address');
        }
    }
    const handleReClick = async ()=>{
        setblock(true);
        setcount(60);
        if(email.length>0){
            const response = await resendOtp(email);
            setotp(response);
            setotpsent(prev=>prev+1);
        }
        else{
            setplaceholder('Enter email address');
        }
    }
  return(
    <>
    <Heading px={2} mb={2}>Verify your account</Heading>
    {
        !otpsent?
        <>
        <VStack px={2}>
        <FormControl>
        <FormLabel>Email Address</FormLabel>
        <Input border={'2px'} borderColor={'#0492C2'} isRequired key={0} type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder={placeholder} _placeholder={{color:'#ff0800'}} />
        </FormControl>
        <Button onClick={handleClick} type='submit' variant="solid" colorScheme="blue">
        Send OTP
        </Button>
        </VStack>
        </>
        :
        <Fragment key={otpsent}>
            <Heading px={2} mb={1} textAlign={'left'} w={'100%'} fontSize={'17px'}>Otp sent to {email}</Heading>
            <VStack px={2}>
        <FormControl>
        <FormLabel>Enter OTP</FormLabel>
        <HStack justifyContent={'center'}>
            <PinInput otp type='number' onChange={handleChange}>
                <PinInputField required border={'2px'} borderColor={'black'}/>
                <PinInputField required border={'2px'} borderColor={'black'}/>
                <PinInputField required border={'2px'} borderColor={'black'}/>
                <PinInputField required border={'2px'} borderColor={'black'}/>
            </PinInput>
        </HStack>
        </FormControl>
        <Flex justifyContent={'space-around'} w={'100%'}>
        <Button onClick={handleSubmit} type="submit" colorScheme='green'>Submit</Button>
        <Button type="submit" isDisabled={block} colorScheme='cyan' onClick={handleReClick}>{block?`Resend in ${count}`:'Resend OTP'}</Button>
        </Flex>
            </VStack>
        </Fragment>
    }
    </>
  )
}

export default Otp