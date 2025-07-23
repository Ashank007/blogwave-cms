import { Box, Button, Divider, Flex, Heading, IconButton, Input, Text, Textarea, useDisclosure, Wrap } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { commentBlog, like, saveblog } from '@/libs/user'
import Image from 'next/image'
import CustomIcons from './CustomIcons'
import { useRouter } from 'next/navigation'
import ShareButton from './ShareButton'

type BlogNavProps={
  auth:string
  id:string
views:string
likes:number
comments:any
userlike:boolean
refresh:Dispatch<SetStateAction<boolean>>
}
import { Icon } from './CustomIcons'
const CustomIcon:React.FC<Icon> = ({image}) => {
  return (
    <Box
    as="span"
    display="inline-block"
    width={["20px"]}
    height={["20px"]}
    backgroundImage={image}
    backgroundSize="cover"
/>
  )
}
export const BlogNav:React.FC<BlogNavProps> = ({id,views,likes,comments,userlike,refresh,auth}) => {
  const {isOpen,onOpen,onClose}=useDisclosure();
  const [liked, setlike] = useState(userlike);
  const [save, setsave] = useState(false);
  useEffect(() => {
    const checkSave= async()=>{
      const response = await saveblog(id,false);
      if(response.success){
        setsave(response.message.saved);
      }
    }
    checkSave();
  }, [id])
  
  const [likess, setlikess] = useState(likes)
  const [comment, setcomment] = useState('')
  const handleLike= async ()=>{
    setlike(!liked);
    const response = await like(id);
    if(response){
      if(liked){
        setlikess(prev=>prev-1);
      }else{
        setlikess(prev=>prev+1);
      }
    }
  }
  const handleSave = async ()=>{
    const response = await saveblog(id,true);
    if(response.success){
      setsave(response.message.saved);
    }
  }
  const handleComment = async ()=>{
    const response = await commentBlog(id, comment);
    refresh(prev=>!prev);
  }
  const latestComments = comments.slice().reverse();
  latestComments.reverse();
  return (
    <Flex color={'#dcdcdc'} justifyContent={'space-between'} direction={['column','row']} gap={[3,1]} alignItems={['flex-start','center']} w={'100%'} px={3}>
        <Flex>
            <Text>{views=='1'? views+ ' person has viewed it':views+' persons have viewed it'}</Text>
        </Flex>
        <Flex alignItems={'center'} gap={4}>
            <Button color={'#dcdcdc'} colorScheme={'black'} isDisabled={auth=='false'} display={'flex'} alignItems={'center'} variant={!liked?'solid':'ghost'} gap={2} onClick={handleLike}>{!liked?<CustomIcon image='/heart2unlike.png'/>:<CustomIcon image='/heart2.png'/>}<Text fontSize={''}>{likess}</Text></Button>
            <Button onClick={onOpen} display={'flex'} bgColor={'#dcdcdc'} _hover={{backgroundColor:'#dcdcdc80'}} alignItems={'center'} gap={2}>
              <CustomIcon image='/comment.png'/>
              <Text color={'#434343'}> {comments?.length}</Text></Button>
            <ShareButton id={id}/>
            {
              save?
              <Button isDisabled={auth=='false'} bgColor={'#dcdcdc'} onClick={handleSave}><CustomIcon image='/unsave.png'/></Button>
              :
              <Button isDisabled={auth=='false'} bgColor={'#d3d3d3'} onClick={handleSave}><CustomIcon image='/save.png'/></Button>
            }
        </Flex>
        <Drawer
        placement={window.innerHeight>768?'left':'right'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody color={'#dcdcdc'} rounded={'8px'}  boxShadow={'0 2px 10px 4px rgba(255, 255, 255, 0.7)'} bgColor={'#191919'} border={'2px solid rgba(255, 255, 255, 0.1)'} display={'flex'} flexDirection={'column'} gap={5}>
            <Flex direction={'column'} gap={4} px={5}>
              <Heading>Comments</Heading>
              <Textarea placeholder='Enter your comment' value={comment} onChange={(e)=>setcomment(e.target.value)}/>
              <Button isDisabled={auth=='false'} onClick={handleComment} colorScheme='blue'>Comment</Button>
            </Flex>
            <Box overflow={'sroll'} height={'20vh'}>

            {comments?.length>0 &&
              latestComments.reverse().map((comment:any,index:number)=>(
                <Flex direction={'column'} gap={1} key={index} px={4}>
                  <Divider borderColor={'rgba(255, 255, 255, 0.1)'}/>
                  <Flex mt={4} gap={4}>
                  <Box rounded={'full'} width={'30px'} height={'30px'} position={'relative'}>
                <Image className='rounded-full object-cover' style={{cursor:"pointer"}} src={comment.owner.profilepic} alt='icon' layout='fill' onClick={onOpen}/>
                </Box>
                <Text fontSize={'25px'}>{comment.owner.username}</Text>
                  </Flex>
                  <Text>{comment.comment}</Text>
                </Flex>
              ))
            }
            </Box>
          </DrawerBody>

         
        </DrawerContent>
      </Drawer>

    </Flex>
  )
}
