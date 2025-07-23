"use client"
import React from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
const MotionBox = motion(Box);
const FormSpinner = () => {
  return (
    <MotionBox width={'100px'} height={'100px'} backgroundImage={'/fishspin3.png'} backgroundSize={'cover'} backgroundPosition={'center'}
      animate={{rotate:[0,360]}}
      
      transition={{duration:5, easing:'linear', repeat:Infinity, repeatType:'loop'}}
      >
      </MotionBox>
  )
}

export default FormSpinner