"use client"
import ProfileComponent from '@/components/MyProfile'
import { getUser } from '@/libs/user';
import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [user, setuser] = useState<any>(null);
  const [refresh, setrefresh] = useState(false)
  useEffect(() => {
  const fetchUser=async ()=>{
    const user = await getUser();
    setuser(user);
  }
  fetchUser();
  }, [refresh])
  return (
    <Box bgImage='/profilecard.png' minH={'88vh'} w='100vw' p={10} bgSize={'cover'}>
      
    {user &&
    <ProfileComponent refresh={setrefresh} profilePic={user.profilepic} name={user.username} email={user.email} description={user.description}
    jobTitle={user.jobTitle} contactDetails={user.contact} location={user.location} blogsPublished={user.ownblogs.length} followers={user.followers.length} following={user.following.length}
    readBlogs={user.recentview} />}
    </Box>
  )
}

export default Page