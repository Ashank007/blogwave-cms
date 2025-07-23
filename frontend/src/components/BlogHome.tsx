"use client"
import { getBlogs } from '@/libs/user'
import { Box, Center, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import BlogHomeCard from './BlogHomeCard'
type BlogHomeProps={
  user:any
}
const BlogHome:React.FC<BlogHomeProps> = ({user}) => {
    const [blogs, setblogs]= useState<any>(null)
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(0);
    useEffect(() => {
     const fetchBlogs = async ()=>{
        const tags=user.interests;
        const response = await getBlogs(tags,page);
        if(response.success){
            if(page>0){
              setblogs((b:any)=>[...b,...response.message]);
            }else{

              setblogs(response.message)
            }
            setloading(false);
        }
    }
    fetchBlogs();
    }, [page,user.interests])
    const handleScroll = ()=>{
      if(window.innerHeight+document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
        setpage(prev=>prev+1);
        setloading(true);
    }
    }
    useEffect(() => {
      window.addEventListener("scroll",handleScroll);
  
      return () => {
      window.removeEventListener("scroll",handleScroll);
      }
    }, [])
    
  return (
    <>
    <Heading pl={3} fontSize={['20px','30px']} py={3} color={'#d3d3d3'}>Your Personlized blogs are all here</Heading>
    <Flex pb={5} pt={3} direction={'column'} alignItems={'center'} gap={3}>
        {
            blogs &&
            blogs.map((blog:any,index:number) =>
                <BlogHomeCard key={blog._id} blog={blog} index={index+1} />
        )
    }
    </Flex>
    <Center w={'100%'}>
    {
      loading ?
      <Spinner/>
      :
      <Text color={'#d3d3d3'}>
        No more blogs to display.
      </Text>
    }
    </Center>
    </>
  )
}

export default BlogHome