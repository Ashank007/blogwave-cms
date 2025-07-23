"use client"
import { getCreatedBlogs, getSavedBlogs, getUser } from '@/libs/user'
import { Box, Wrap } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MyBlogCard from './MyBlogCard'
type BlogProps={
    refresh:boolean,
    setrefresh:Dispatch<SetStateAction<boolean>>
}
const SaveBlogs:React.FC<BlogProps> = ({refresh,setrefresh}) => {
    const [blogs, setblogs] = useState<any>(null)
    useEffect(() => {
        const fetchblogs = async()=>{
            const response = await getSavedBlogs();
            setblogs(response.savedBlogs);
        }
        fetchblogs();
    }, [refresh])
  return (
    <Box pt={5}>
        <Wrap spacing={5}>
            { blogs &&
            blogs.map((blog:any)=>(
                <MyBlogCard refr={refresh} refresh={setrefresh} type='save' key={blog._id} blog={blog} />
            ))

            }
        </Wrap>
    </Box>
  )
}

export default SaveBlogs