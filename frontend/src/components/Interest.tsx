import React, { useState } from 'react';
import { Box, Button, VStack, Text, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { profilesubmit } from '@/libs/auth';
import bloginterests from '@/utils/blogtags';
import { ToastContainer,toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const interests = bloginterests
type InterestProps={
  name: string
  image: string
  email: string
}
const InterestsSelector: React.FC<InterestProps> = ({name,image,email}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const router = useRouter();
  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };
  const handleClick= async ()=>{
      const response = await profilesubmit(name,image,selectedInterests,email);
      if(response.success){
        toast.success("Profile submitted successfully!");
        router.push('/login');
      }else{
        toast.error(response.message);
      }
  }
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <Heading mb={7} fontSize="xl">Select Your Interests</Heading>
      <Wrap spacing={2} justify={'center'} align={'center'} maxH={'40vh'} overflow={'scroll'} >
        {interests.map(interest => (
          <WrapItem key={interest} p={0} >
            <Button
              onClick={() => handleInterestClick(interest)}
              size={'sm'} whiteSpace={'pre-wrap'}
              bg={selectedInterests.includes(interest) ? 'cyan.800' : '#00000070'}
              textAlign={'center'} w={'100px'} py={6}
              _hover={{bg:``}}
              color={'#dcdcdc'}
              variant={selectedInterests.includes(interest) ? 'solid' : 'outline'}
            >
              {interest}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
        <Button colorScheme='blue' onClick={handleClick} >Submit</Button>
        <ToastContainer />
    </Box>
  );
};

export default InterestsSelector;
