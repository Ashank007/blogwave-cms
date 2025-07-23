"use client"
import { getProfile, getUser } from '@/libs/user'
import React, { useEffect, useState } from 'react'
import ProfileComponent from './Profile2'
import { Box, Divider, Flex, Heading } from '@chakra-ui/react'
import UserBlogs from './UserBlogs'
type UserProps={
    name:string
}
const UserProfile:React.FC<UserProps> = ({name}) => {
    const [user, setuser] = useState<any>(null);
    const [refresh, setrefresh] = useState(false);
    useEffect(() => {
        const fetchuser = async ()=>{
    const user = await getProfile(name);
    setuser(user);
        }
        fetchuser();
        
    }, [name,refresh]);
    
  return (
    <Flex bgImage={'/dark3.avif'} direction={['column','row']} p={5} gap={[0,10]}  height={['auto','100vh']}>
      <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
       {user? <ProfileComponent refresh={setrefresh} user={user}/>:
       <Heading w={'100vw'} fontSize={'50px'} textAlign={'center'} mt={5}>No User Found</Heading>
       }
      </Flex>
      <Divider display={['block','none']} mt={15} pt={5} borderColor={'white'}/>
       {user && user.ownblogs && <UserBlogs blogs={user.ownblogs}/>}
    </Flex>
  )
}

export default UserProfile