import { Box, Center, Divider, Flex, Heading, Icon, Text, Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useRef } from 'react'
import TransitionLink from './TransistionLink'
import { SmallAddIcon, ViewIcon } from '@chakra-ui/icons'
import CustomIcons from './CustomIcons'
type CardProps={
   blog:any
   index:number
}
const BlogHomeCard:React.FC<CardProps> = ({blog,index}) => {
    const ref = useRef<HTMLDivElement>(null);
    const date = new Date(blog.createdAt).toLocaleDateString();
  return (
    <TransitionLink href={`/blog/${blog._id}`} label='' open={false}>
    <Flex color={'#dcdcdc'} border={'1px solid rgba(255, 255, 255, 0.2)'} backdropBlur={'lg'}backdropFilter={'blur(5px)'} backgroundColor={'rgba(255, 255, 255, 0.1)'}  _hover={{backgroundColor:'rgba(255, 255, 255, 0.2)',backdropFilter:'blur(15px)'}}direction={index%2?'row':'row-reverse'} w={['90vw','70vw']} h={['150px','250px']} rounded={'full'} justifyContent={'flex-start'} alignItems={'center'} px={'2'}>
        <Flex minW={'50%'} ref={ref} boxShadow=' 0 4px 6px 5px rgba(0, 0, 0, 0.8), 0 10px 15px 5px rgba(0, 0, 0, 0.9)' direction={index%2?'row':'row-reverse'} overflow={'hidden'} bgColor={'#2b2b2b'} h={'90%'} rounded={'full'} alignItems={'center'} transition="all 0.9s ease-in-out" gap={3} px={2} onClick={()=>{
            if(ref.current){
                ref.current.style.flexGrow='10';
            }
        }} >
            <Box height={'90%'} aspectRatio={'1/1'} position={'relative'} rounded={'full'} overflow={'hidden'}>
            <Image src={blog.coverpic} alt='coverpic' layout='fill' className='rounded-full object-cover' />
            </Box>
            <Flex flex={1} justifyContent={'space-evenly'} pl={index%2?0:4} h={'100%'} direction={'column'}>
                <Box pl={index%2?0:14} pr={index%2?14:0} pb={1} pt={[2,6]}>
                <Heading whiteSpace={'wrap'} fontSize={['17px','25px']} as={'h3'} textShadow=' 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(0, 0, 0, 0.5)'>{blog.title.length>20?blog.title.slice(0,20)+'...':blog.title}</Heading>
                </Box>
                <Flex  gap={3} alignItems={'center'} pb={1}>
                  <Box rounded={'full'} width={['20px','30px']} height={['20px','30px']} position={'relative'}>
                <Image className='rounded-full object-cover' style={{cursor:"pointer"}} src={blog.owner.profilepic} alt='icon' layout='fill'/>
                </Box>
                <Text color={'#fff'} fontSize={['15px','25px']}>{blog.owner.username}</Text>
                </Flex>
             
                <Flex   pb={3} w={'100%'} gap={3} alignItems={'center'} pl={index%2?0:[3,6]}>
                        <Text whiteSpace={'nowrap'} fontSize={['12px','20px']}><ViewIcon w={['12px','20px']}/> {blog.views} </Text>
                        <Flex alignItems={'center'} gap={1}>
                            {
                                blog.liked?
                                <CustomIcons image={'/heart2.png'}/>
                                :
                                <CustomIcons image={'/heart2unlike.png'}/>
                            }
                        <Text fontSize={['12px','20px']}>{blog.likes}</Text>
                        </Flex>
                        <Flex alignItems={'center'} gap={1}>
                        <CustomIcons image='/comment.png'/>
                        <Text fontSize={['12px','20px']}>{blog.comments}</Text>
                        </Flex>
                        <Text px={3} align={'right'} color={'gray.200'} fontSize={['10px','16px']}>{blog.read?'Read':'Not Read'}</Text>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
    </TransitionLink>
  )
}

export default BlogHomeCard
