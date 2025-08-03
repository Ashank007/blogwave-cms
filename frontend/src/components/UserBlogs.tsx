import { Box, Divider, Heading, Wrap } from '@chakra-ui/react'
//import { DynaPuff } from 'next/font/google'
import React from 'react'
import MyBlogCard from './MyBlogCard'
import localFont from 'next/font/local';
const dyna = localFont({
  src: '../app/fonts/DynaPuff-VariableFont_wdth,wght.ttf',
  weight: '700',
});
type UserBlogs={
    blogs:any
}
const UserBlogs:React.FC<UserBlogs> = ({blogs}) => {
  return (
    <Box overflow={['auto','scroll']} pt={4}>
    <Heading fontFamily={dyna.style.fontFamily} fontWeight={900} fontSize={'4xl'} backgroundClip={'text'} bgImage={'/waterText.jpg'}
    textShadow={'3px 3px 8px #00ffff70'}
    sx={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitTextStroke: '2px #434343',
      }} p={2} my={2}>Their Blogs</Heading>
    <Box pt={3} >
        <Wrap spacing={5}>
            { blogs &&
            blogs.map((blog:any)=>(
                <MyBlogCard type='view' key={blog._id} blog={blog} />
            ))

            }
        </Wrap>
    </Box>
    </Box>
  )
}

export default UserBlogs