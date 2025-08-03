"use client"
import { SearchIcon, SmallAddIcon, } from '@chakra-ui/icons'
import { Box,Button,Divider,Flex,Heading, IconButton, Image as Img, List, ListIcon, ListItem, useDisclosure, } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
//import { Lilita_One } from 'next/font/google'
const lilta = localFont({
  src: '../app/fonts/LilitaOne-Regular.ttf',
  weight: '400',
});
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { getUser, logout } from '@/libs/user'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import TransitionLink from './TransistionLink'
import localFont from 'next/font/local'
const CustomIcon:React.FC<{image:string}>=({image})=>{
 
    return (
    <Box
    as="span"
    display="inline-block"
    width={["20px"]}
    height={["20px"]}
    backgroundImage={image}
    backgroundSize="cover"
/>)
}
const Nav: React.FC = () => {
    const router = useRouter();
    const [user, setuser] = useState<any>(null);
    useEffect(() => {
     const fetchuser = async()=>{
         const response = await getUser();
         setuser(response);
     }
     fetchuser();
    }, [])
    const {isOpen, onOpen, onClose} = useDisclosure();
    const handleClick= async ()=>{
        const response = await logout();
        if(response.success){
            toast.success(response.message);
            router.push('/login');
        }
        else{
            toast.error(response.message)
        }
    }
  return (
    <Flex px={2} overflowX={'hidden'} position={'sticky'} rounded={'md'} backdropBlur={'lg'} backdropFilter={'blur(3px)'} opacity={0.9} brightness={100} boxShadow={'0px 5px 9px 4px #191919'} w={'100vw'} py={2} alignItems={'center'} justifyContent={'space-between'} bgImage={'/head3.avif'} bgPos={'bottom'}>
      
            <Flex gap={2} alignItems={'center'}>
            <Image src={'/logo1.png'} alt='logo' width={70} height={70}/>
            <TransitionLink label='' open={false} href='/home'>
            <Heading style={{background: 'linear-gradient(45deg, #c0c0c0, #ffffff, #e0e0e0)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0px 0px 5px 5px rgba(255, 255, 255, 0.9)',}} fontFamily={lilta.style.fontFamily} fontSize={['40','50']}>BW</Heading>
  </TransitionLink>
            </Flex>
            <Flex mr={5} gap={4}>
              <TransitionLink label='search' href='/home/search' open={false}>
              <Box p={2}  bg="rgba(255, 255, 255, 0.1)"
      color="white"
      _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
      _active={{ bg: "rgba(255, 255, 255, 0.3)" }} 
      _focus={{ boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.4)" }}
      borderRadius="lg"
      border={'2px solid #434343'}
      shadow="md"
               
               w={'40px'} h='40px' display={'flex'} justifyContent={'center'} alignItems={'center'} >
                <SearchIcon/>
              </Box>
              </TransitionLink>
                {user &&
                <Box rounded={'full'} width={'40px'} height={'40px'} position={'relative'}>
                <Image className='rounded-full object-cover' style={{cursor:"pointer"}} src={user.profilepic} alt='icon' layout='fill' onClick={onOpen}/>
                </Box>}
            </Flex>
            <Drawer
            
            size={'xs'}
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bgSize={'cover'} bgImage={'/card4.avif'}>
          <DrawerCloseButton />
          <DrawerHeader color={'black'}>Your Account</DrawerHeader>

          <DrawerBody>
            <Flex direction={'column'} minH={'70vh'} bg="rgba(255, 255, 255, 0.1)" className='bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-xl shadow-lg' >

          <Box  p={2}
  className="flex flex-col pb-6 gap-2 flex-grow text-[#191919] justify-center items-center "
>
  <Box className="w-20 h-20 relative">
    <Image
      src={user?.profilepic}
      alt=""
      layout="fill"
      className="object-cover rounded-full"
      />
  </Box>
  <Box className="text-2xl">{user?.username}</Box>
  <Box className="text-md text-[#191919]">No description</Box>

</Box>
<Flex justifyContent={'center'} alignItems={'center'}>
<Divider color={'black'} borderColor={'black'} bgColor={'black'} borderBottom={'4px'} width={'70%'} justifySelf={'right'}/>
</Flex>
<Box flexGrow={'2'} className="text-[#191919] mt-4">
  <List p={5} justifyContent={'space-around'} className="flex flex-col items-start" w={'100%'}>
    <ListItem
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      _hover={{
        bgColor:'#6fc0db80',
        backdropBlur:'lg',
        backdropFilter:'blur(3px)',
        border:'1px solid #0a74da4d'
      }}
      transition={'all 0.4s ease-in-out'}
      className="py-4 px-4 w-full transition-all duration-300 rounded-lg"
    >
      <CustomIcon image='/profile.png'/>
      <TransitionLink href={`/home/profile`} label="" open={false}>
        Profile
      </TransitionLink>
    </ListItem>
    <ListItem
      display="flex"
      justifyContent="center"
      gap={1}
      alignItems="center"
      _hover={{
        bgColor:'#6fc0db80',
        backdropBlur:'lg',
        backdropFilter:'blur(3px)',
        border:'1px solid #0a74da4d'
      }}
      transition={'all 0.4s ease-in-out'}
      className="py-4 px-4 w-full transition-all duration-300 rounded-lg"
      >
        <ListIcon as={SmallAddIcon} border={'2px'} rounded={'full'}/>
      <TransitionLink href={`/home/create`} label="" open={false}>
        Create
      </TransitionLink>
    </ListItem>
    <ListItem
      display="flex"
      gap={1}
      justifyContent="center"
      alignItems="center"
      _hover={{
        bgColor:'#6fc0db80',
        backdropBlur:'lg',
        backdropFilter:'blur(3px)',
        border:'1px solid #0a74da4d'
      }}
      transition={'all 0.4s ease-in-out'}
      className="py-4 px-4 w-full transition-all duration-300 rounded-lg"
      >
        <CustomIcon image='/myblog.png'/>
      <TransitionLink href={`/home/myblogs`} label="" open={false}>
        My Blogs
      </TransitionLink>
    </ListItem>
  </List>
</Box>

      </Flex>
          </DrawerBody>

          <DrawerFooter display={'flex'} justifyContent={'center'} alignItems={'center'}>
           <Button leftIcon={<CustomIcon image='/logut.webp'/>} colorScheme='red' onClick={handleClick}>LogOut</Button>
          </DrawerFooter>
        </DrawerContent>
        
      </Drawer>
     
        </Flex>
  )
}

export default Nav