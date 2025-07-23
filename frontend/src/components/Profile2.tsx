import { Box, Flex, Avatar, Text, Stack, Button, Divider } from "@chakra-ui/react";
import "./profileCard.css"
import { followuser } from "@/libs/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
type ProfileComponentProps = {
 user:any;
 refresh:Dispatch<SetStateAction<boolean>>
};
const CustomIcon:React.FC<{image:string}> = ({image})=>(
  <Box
  as="span"
    display="inline-block"
    width={["12px"]}
    height={["12px"]}
    backgroundImage={image}
    backgroundSize="cover"
  />
)
const ProfileComponent: React.FC<ProfileComponentProps> = ({refresh,user}) => {
  const [follow, setfollow] = useState(false);
  useEffect(() => {
    const fetchFollow = async()=>{
      const response = await followuser(user._id,true)
      if(response.success) {
       setfollow(response.message.follow)
      }
    }
    fetchFollow()
  }, [user._id])
  
  const handleFollow = async ()=>{
    const response = await followuser(user._id,false)
    if(response.success) {
     setfollow(response.message.follow)
     refresh(prev=>!prev)
    }
  }
  return (
    <Flex bgImage={'/profileCard.webp'} bgPosition={'left'}  minW={["100%", "250px"]} rounded={'xl'}
    maxW={["100%", "400px"]}
    h={'100%'}
    alignItems={'center'} px={6} position={'relative'}
    >
    <Box
    
    className="profile"
      p={6}
      bg="transparent"
      color="#191919"
      borderRadius="lg"
      boxShadow="md"
      minW={["100%", "250px"]}
      maxW={["100%", "400px"]}
      h={'fit-content'}
      mx="auto"
      zIndex={10}
      style={{position: 'relative',zIndex: 100}}
      >
      <Flex direction="column" alignItems="center">
        <Avatar boxShadow={'0px 4px 10px #00000080'} src={user.profilepic} size="xl" mb={4} />
        <Text color={'#191919'} fontSize="xl" fontWeight="bold">
          {user.username}
        </Text>
        <Text fontSize="sm" color="#434343" mb={2}>
          @{user.username} | {user?.contact?user.contact:"No contact"}
        </Text>
        <Text fontSize="md" color="#191919">
          {user?.jobTitle?user?.jobTitle:"No jobTitle"}
        </Text>
        <Flex alignItems={'center'} mt={2} gap={2}>

          <CustomIcon image="/geo.png"/>
        <Text fontSize="sm" color="#424242">
          {user?.location?user.location:'No location'}
        </Text>
        </Flex>
      </Flex>

      <Divider />

      <Flex direction={[ 'row','column']} justifyContent="space-between" mt={4} mb={4} textAlign="center">
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {user.ownblogs.length}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Posts
          </Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {user.followers.length}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Followers
          </Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            {user.following.length}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Following
          </Text>
        </Box>
      </Flex>

      <Text fontSize="sm" color="#434343" textAlign="center" mb={6}>
        {user.description?'"'+user.description+'"':"No description"}
      </Text>

      <Flex justify="center">
        <Button
         bg={!follow?"#03a9f4":'#ff6f6f'}
         border="1px solid rgba(255, 255, 255, 0.5)"
         boxShadow={"inset 4px 4px 30px rgba(255, 255, 255, 0.5)"}
         transition={'1s all'}
         color="#f2f2f2"
         _hover={!follow?{ bg: "#03a9f480", color: "#000000"}:{ bg: "#ff6f6f80", color: "#000000"}}
         width="80%"
         onClick={handleFollow}
          >
          {!follow?'Follow':'Unfollow'}
        </Button>
      </Flex>
          </Box>
    </Flex>
  );
};

export default ProfileComponent;
