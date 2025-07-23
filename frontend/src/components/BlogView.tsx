"use client"
import { commentBlog, followuser, getBlog, getunauthBlog, like } from '@/libs/user';
import { Avatar, Box, Button, Flex, Heading, HStack, Image, Input, Text, VStack, Icon } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blog from './Blog';
import Nav from './Nav';
import { BlogNav } from './BlogNav';
import {Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton,PopoverAnchor} from '@chakra-ui/react'
import TransitionLink from './TransistionLink';
import { ExternalLinkIcon } from '@chakra-ui/icons';
type ViewProps={
    id:string
    auth:string
}
const BlogView:React.FC<ViewProps> = ({id,auth}) => {
    const [blog, setblog] = useState<any>(null);
    const [refresh, setrefresh] = useState(false);
    const [follow, setfollow] = useState(false);
    useEffect(() => {
      const fetchFollow = async()=>{
        const response = await followuser(blog?.owner._id,false)
        if(response.success) {
         setfollow(response.message.follow)
        } 
      }
        if(blog){
      fetchFollow()
        }
    }, [blog?.owner._id,blog])
    
    const handleFollow = async ()=>{
      const response = await followuser(blog.owner._id,false)
      if(response.success) {
       setfollow(response.message.follow)
      }
    }
    useEffect(() => {
     const fetchblog = async()=>{
      let response;
      if(auth=='false'){
        response = await getunauthBlog(id);
      }else{
        response = await getBlog(id);
      }
         if(response.success){
           setblog(response.message);
          }
     }
      fetchblog();
    }, [id,refresh,auth])
    const color = ['red.300','cyan.300','green.300','yellow.300']
  return (
    <Box  w={'100vw'} overflowX={'hidden'} p={0}>
    <Nav/>
    {blog ?
    <Flex justifyContent={'center'} w={'100vw'} overflowX={'hidden'} color={'#dcdcdc'}>
    <Flex gap={3} direction={'column'} w={['80vw','70vw','60vw','50vw']} minW={'50vw'} maxW={'99vw'} mt={10}>
    <Heading fontSize={'50px'}>{blog?.title}</Heading>
    <Flex alignItems={'center'} gap={3}>
    <Popover placement='bottom-start'>
  <PopoverTrigger>
        <Image cursor={'pointer'} src={blog.owner?.profilepic} alt='profile' width={'40px'} height={'40px'} rounded={'full'}/>
  </PopoverTrigger>
  <PopoverContent maxW={'70vw'} bgImage={'/probg.jpg'} color='#000' border={'1px solid #7df9ff'}>
    <PopoverArrow bg='#f5f5f5' />
    <PopoverCloseButton />
    <PopoverHeader>
          <HStack>
            <Avatar src={blog?.owner?.profilepic} />
            <Box ml="3">
              <Text fontWeight="bold">{blog.owner.username}</Text>
              <Text fontSize="sm">{blog.owner?.followers?.length} Followers</Text>
            </Box>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <VStack align="start">
            <Text fontSize="sm" noOfLines={3}>
              {blog.owner?.description?'"'+blog.owner.description+'"':'No description'}
            </Text>
            <Flex justifyContent={'space-between'} w='100%'>

            <Button
         bg={!follow?"#03a9f4":'#ff6f6f'}
         border="1px solid rgba(255, 255, 255, 0.5)"
         boxShadow={"inset 4px 4px 30px rgba(255, 255, 255, 0.5)"}
         transition={'1s all'}
         color="#f2f2f2"
         _hover={!follow?{ bg: "#03a9f480", color: "#000000"}:{ bg: "#ff6f6f80", color: "#000000"}}
         size='sm'
         onClick={handleFollow}
         isDisabled={auth=='false'}
          >
          {!follow?'Follow':'Unfollow'}
        </Button>
            <TransitionLink open={false} label='' href={`/user/${blog.owner?.username}`}>
            <Box p={2}  bg="rgba(255, 255, 255, 0.1)"
      color="white"
      _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
      _active={{ bg: "rgba(255, 255, 255, 0.3)" }} 
      _focus={{ boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.4)" }}
      borderRadius="lg"
      border={'2px solid #434343'}
      shadow="md"
               
               w={'35px'} h='35px' display={'flex'} justifyContent={'center'} alignItems={'center'} >
                <Icon as={ExternalLinkIcon} color='#191919'/>
              </Box>
            </TransitionLink>
            </Flex>
          </VStack>
        </PopoverBody>
  </PopoverContent>
</Popover>
    <Text fontSize={'35px'} as={'h4'}>{blog.owner?.username}</Text>
    </Flex>
    <BlogNav auth={auth} refresh={setrefresh} userlike={blog.liked} id={id} views={blog?.views} likes={blog?.likes} comments={blog?.comments}/>
    <Flex gap={3} wrap={'wrap'}>
      {
        blog.tags && blog.tags.map((tag:string,index:number)=>(
          <Box key={tag} fontSize={'15px'} color={'#191919'} p={2} bgColor={color[index%4]} rounded={'full'}>{tag}</Box>
        ))
      }
    </Flex>
    <Blog html={blog?.para}/>
    </Flex>
        </Flex>
        :
        <Heading fontSize={'50px'} mt={5} textAlign={'center'}>No blog found</Heading>
}
    </Box>
  );
};

export default BlogView
