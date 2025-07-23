"use client"
import { deleteDraft, getCreatedBlogs, getDraftBlogs, getUser } from '@/libs/user'
import { Box, Button, Wrap } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MyBlogCard from './MyBlogCard'
type BlogProps={
    refresh:boolean,
    setrefresh:Dispatch<SetStateAction<boolean>>
}
const DraftBlogs:React.FC<BlogProps> = ({refresh,setrefresh}) => {
    const [blogs, setblogs] = useState<any>(null)
    useEffect(() => {
        const fetchblogs = async()=>{
            const response = await getDraftBlogs();
            setblogs(response.draftBlogs);
        }
        fetchblogs();
    }, [refresh])
  return (
    <Box pt={5}>
        <Wrap spacing={5}>
            { blogs &&
            blogs.map((blog:any)=>(
               
                <MyBlogCard refresh={setrefresh} type='draft' key={blog._id}  blog={blog} />
            ))

            }
        </Wrap>
    </Box>
  )
}

export default DraftBlogs