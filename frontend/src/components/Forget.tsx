"use client"
import { Box, FormControl, FormLabel, Input, Button, VStack, Heading, Divider, HStack, Flex } from '@chakra-ui/react'
import React, { FormEvent, Fragment, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PinInput, PinInputField } from '@chakra-ui/react'
import Otp from './Otp'
import NewPass from './NewPass'
const MotionBox = motion(Box)
const Forget = ()=>{
    const [success, setsuccess] = useState(0)
    const [otpsuccess, setotpsuccess] = useState(false)
    const box = useRef<HTMLDivElement>(null)
    const handleClick = async ()=>{
        setTimeout(() => {
            setsuccess(prev=>prev+1);
        }, 1000);
    }
    return(
        <VStack w="full" rounded="md" p={2} gap={6} color={'teal'}>
            <VStack overflow={'hidden'} position={'relative'} gap={2} w={'100%'}>
            {
                !otpsuccess ?
                <Otp email1='' otpsuccess={setotpsuccess} login={true}/>
                :
                <NewPass/>
            }
            </VStack>
        </VStack>
    )
}
export default Forget;