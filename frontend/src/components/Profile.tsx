import { Box, Text, VStack, Heading, Icon, Image, HStack } from "@chakra-ui/react";
//import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
type ProfileProps={
    user:any
}
const ProfileComponent:React.FC<ProfileProps> = ({ user }) => {
  return (
    <Box
      display={{ md: "flex" }}
      color={'black'}
      alignItems="center"
      bg="gray.100"
      p={8}
      borderRadius="md"
      boxShadow="md"
      gap={8}
    >
      <Box minW={'30vw'} maxW={'80vw'} height={'400px'} position={'relative'} flexShrink={0} >
        <Image
          src={user.profilepic}
          alt={`${user.name}'s profile picture`}
          objectFit={'cover'}
          objectPosition={'center'}
          height={400}
        />
      </Box>
      <VStack
        spacing={4}
        align="start"
        w={{ base: "100%", md: "50%" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Heading size="xl">{user.username}</Heading>
        <Text fontSize="lg">{user.jobTitle}</Text>
        <Text fontSize="md" color="gray.600">
          {user.description?.lenght>0?user.description:'No description'}
        </Text>
        <Box>
            <Heading>
                Contact details
            </Heading>
        </Box>
        <HStack>
            <Text>{user.followers?.length} followers</Text>
            <Text>{user.following?.length} following</Text>
            <Text>{user.ownblogs?.length} blogs published</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProfileComponent;
