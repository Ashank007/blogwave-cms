"use client"
import BlogHome from '@/components/BlogHome';
import { getUser } from '@/libs/user';
import { Box} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [user, setuser] = useState<any>(null);
    useEffect(() => {
     const fetchuser = async()=>{
         const response = await getUser();
         setuser(response);
     }
     fetchuser();
    }, [])
  return (
    <Box minH={'91vh'} bgImage={'/dark3.avif'} >
      {user && <BlogHome user={user}/>}
    </Box>
  )
}

export default Page