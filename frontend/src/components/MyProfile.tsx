import { Box, Flex, Avatar, Text, Button, Editable, EditableInput, EditablePreview, Stack, IconButton, Divider, Icon, SimpleGrid, Wrap, Heading } from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons';
import { MdEmail, MdPhone, MdEdit } from "react-icons/md";
import BlogHomeCard from "./BlogHomeCard";
import MyBlogCard from "./MyBlogCard";
import CustomEdit from "./CustomEdit";
import { addContact, addDesc, addJob, addlocation } from "@/libs/user";
import { Dispatch, SetStateAction } from "react";
import { DynaPuff } from "next/font/google";
const dyna = DynaPuff({subsets:['latin'], weight:"700"})
type ProfileProps = {
  profilePic: string;
  name: string;
  email: string;
  description: string;
  jobTitle: string;
  contactDetails: string;
  blogsPublished: number;
  followers: number;
  following: number;
  readBlogs: any;
  location: string;
  refresh:Dispatch<SetStateAction<boolean>>;
};

const ProfileComponent: React.FC<ProfileProps> = ({
  profilePic,
  refresh,
  name,
  email,
  description,
  jobTitle,
  contactDetails,
  blogsPublished,
  followers,
  following,
  readBlogs,
  location,
}) => {
const handleJob = async (value:string)=>{
  const response = await addJob(value);
  if(response.success){
    refresh(prev=>!prev)
  }else{
    refresh(prev=>!prev)
  }
}
const handleDesc = async (value:string)=>{
  const response = await addDesc(value);
  if(response.success){
    refresh(prev=>!prev)
  }else{
    refresh(prev=>!prev)

  }
}
const handleContact = async (value:string)=>{
  const response = await addContact(value);
  if(response.success){
    refresh(prev=>!prev)
  }else{
    refresh(prev=>!prev)
  }
}
const handlePlace = async (value:string)=>{
  const response = await addlocation(value);
  if(response.success){
    refresh(prev=>!prev)
  }else{
    refresh(prev=>!prev)
  }
}
  return (
    <Box
      p={6}
      bg="##e0f7fa30"
      backdropBlur={'4px'}
      
      color="white"
      borderRadius="lg"
      boxShadow="xl"
      backdropFilter="blur(4px)"
      border="1px solid rgba(255, 255, 255, 0.8)"
      minHeight="80vh"
      maxWidth="1200px"
      mx="auto"
    >
      <Flex direction={['column', 'column', 'row']} gap={6}>
        <Box
        color={'#191919'}
          flex="1"
          textAlign={['center', 'center', 'left']}
          p={4}
          bgImage={'/name.png'}
          bgSize={'cover'}
          borderRadius="lg"
          border='2px solid #fcfcfc'
          boxShadow="4px 4px 5px #00fffff"
        >
          <Avatar src={profilePic} size="2xl" mx={['auto', 0]} />
          <Text fontSize="2xl" fontWeight="bold" mt={4}>
            {name}
          </Text>
          <Text fontSize="md">
            {email}
          </Text>
          <Flex alignItems="center" mt={2} justifyContent="center">
          <CustomEdit size="lg" onEdit={handleJob} value={jobTitle || 'No job title'}/>
          </Flex>
        </Box>

        <Box color={'#434343'} flex="2" p={4} bg="#87ceeb70" border={'2px solid #dcdcdc'} borderRadius="lg" boxShadow="md" backdropBlur={'4px'} backdropFilter={'blur(4px)'}>
          <Stack spacing={4}>
            <Flex alignItems="center">
              <Text fontSize="md" fontWeight="medium">
                Contact:
              </Text>
              <CustomEdit onEdit={handleContact} value={contactDetails || 'No contact details'}/>
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="md" fontWeight="medium">
                Description:
              </Text>
              <CustomEdit onEdit={handleDesc} value={description || 'No description'}/>
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="md" fontWeight="medium">
                Location:
              </Text>
              <CustomEdit onEdit={handlePlace} value={location || 'No location'}/>
            </Flex>
          </Stack>

          <Divider my={4} />

          <SimpleGrid columns={[1, 3]} spacing={10}>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold">
                {blogsPublished}
              </Text>
              <Text fontSize="sm" mt={2}>
                Blogs Published
              </Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold">
                {followers}
              </Text>
              <Text fontSize="sm" mt={2}>
                Followers
              </Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold">
                {following}
              </Text>
              <Text fontSize="sm" mt={2}>
                Following
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>

      <Divider my={6} />

      <Box>
      <Heading fontFamily={dyna.style.fontFamily} fontWeight={900} fontSize={'4xl'} backgroundClip={'text'} bgImage={'/waterText.jpg'}
    textShadow={'3px 3px 8px #00ffff70'}
    sx={{
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        WebkitTextStroke: '2px #434343',
      }} p={2} my={2}>Recent Blogs Viewed</Heading>
        <Box pt={5}>
          <Wrap spacing={5}>
            {readBlogs &&
              readBlogs.map((blog: any) => <MyBlogCard type='view' key={blog._id} blog={blog} />)}
          </Wrap>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileComponent;
