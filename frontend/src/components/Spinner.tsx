"use client"
import React, { useRef } from 'react';
import { Center, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionCenter = motion(Center);
const MotionBox = motion(Box);

const Loading1: React.FC = () => {
  const box = useRef<HTMLDivElement>(null)
  return (
    <MotionCenter
    position={'absolute'}
    top={0}
    left={0}
    ref={box}
      width="100vw"
      height="100vh"
      backgroundImage={'/loadbg4.jpg'}
      backgroundSize={'cover'} backgroundPosition={'center'}
      zIndex="5"
      initial={{opacity:1 }}
      animate={ { opacity:0.2 }}
      transition={{ duration: 4, ease: "easeIn" , delay: 1}}
      onAnimationComplete={() => {
        if(box.current){
          box.current.style.display = "none";
        }
      }}
      className="spinner-container"
    >
      <MotionBox width={'300px'} height={'300px'} backgroundImage={'/fishl.png'} backgroundSize={'cover'} backgroundPosition={'center'}
      initial={{rotate:'0deg'}}
      animate={{rotate:"360deg"}}
      transition={{duration:"5", easing:'easeIn'}}
      >
          
      </MotionBox>
    </MotionCenter>
  );
};

export default Loading1;
