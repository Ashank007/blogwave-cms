"use client"
import React, {useState, useEffect, useRef} from 'react'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import TransitionLink from './TransistionLink'
import { useInView } from 'react-intersection-observer'
import Scene from './ThreeScene'
import gsap from 'gsap'
const MotionBox = motion(Box);
type SubmarineProps={
  label: string,
  href: string,
}
const Submarine:React.FC<SubmarineProps> = ({label,href}) => {
    const [open, setopen] = useState(false)
    const [click, setclick] = useState(false)
    const boxref = useRef<HTMLDivElement>(null)
  const sceneVariants={
    far:{
      x:'-30vw'
    },
    near:{
      x:'5vw'
    },
    go:{
        x:'100vw',
        transistion:{
            duration:1,
            ease:'easeOut'
        }
    }
  }
  useEffect(() => {
    if(boxref.current && click){
      gsap.to(boxref.current,{x:'50vw', duration:1});
    }
  }, [click]);
  
  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.1,   
  });
  return (
    <MotionBox pointerEvents={'all'} p={0} onClick={()=>setclick(true)} onAnimationComplete={ ()=>{ setopen(true);
    }}  ref={boxref} variants={sceneVariants}  initial="far" animate={inView?"near":''}   transition={{duration:4, ease:'easeIn'}} w={'fit-content'} h={'fit-content'} position={'relative'}>
      <Box p={0} className={'w-48'} ref={ref} display={'flex'} justifyContent={'center'} h={'fit-content'} >
    <TransitionLink href={href} label={label} open={open}>
    <Scene inView={inView}/>
    </TransitionLink>
    </Box>
    </MotionBox>
  )
}

export default Submarine