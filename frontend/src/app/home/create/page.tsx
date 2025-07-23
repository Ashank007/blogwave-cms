import dynamic from 'next/dynamic';
import React from 'react'
const BlogCreate = dynamic(() => import('@/components/BlogCreate'), { ssr: false });
//import BlogCreate from '@/components/BlogCreate';
import { Box } from '@chakra-ui/react';
const page = () => {
  return (
    <Box w={'100vw'} overflowX={'hidden'}>
    <BlogCreate/>
    </Box>
  )
}

export default page