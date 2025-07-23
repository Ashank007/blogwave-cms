import { Box, Button, Flex, Heading, Icon, Input, Text, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import Image from 'next/image'
import { EditIcon } from '@chakra-ui/icons'
import bloginterests from '@/utils/blogtags'
type CreateHeaderProps={
  pending:boolean
  edit:boolean,
    handlePublish:()=>void,
    handleSave:()=>void,
    selectedInterests:string[],
    setSelectedInterests: Dispatch<SetStateAction<string[]>>
    coverpic:File|null,
    setcoverpic:Dispatch<SetStateAction<File|null>>,
    coverpicurl:string
}
const interests = bloginterests
const CreateHeader:React.FC<CreateHeaderProps> = ({pending,edit,handlePublish,handleSave, selectedInterests, setSelectedInterests,coverpic,setcoverpic, coverpicurl}) => {
    const {isOpen:isOpen1, onClose:onClose1, onOpen:onOpen1}= useDisclosure();
    const {isOpen:isOpen2, onClose:onClose2, onOpen:onOpen2}= useDisclosure();
    const [temp, settemp] = useState('');
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files? event.target.files[0]:null;
      if(file){
          const url = URL.createObjectURL(file);
          settemp(url);
          setcoverpic(file);
      }
    };
  const handleInterestClick = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };
  return (
    <Flex w={'100vw'} justifyContent={'space-between'} alignItems={'center'} p={5}>
        <Heading color={'#d3d3d3'} textShadow={'2px 1px 2px #00FFCC'}>
            {!edit?"CREATE":"EDIT"}
        </Heading>
        <Flex gap={2} justifyContent={'flex-end'}  alignItems={'center'} px={2}>
            <Button bg="#3a6ea5" color="white" borderRadius="md" ml={4} _hover={{bg: "#4a89c5",transform: "scale(1.05)",boxShadow: "0px 0px 10px rgba(74, 137, 197, 0.6)"}}
  _active={{bg: "#325a80",boxShadow: "inset 0px 0px 5px rgba(50, 90, 128, 0.6)",}} onClick={onOpen2}>
                Draft
            </Button>
            <Button  bg="#1e4d4f" color="white" borderRadius="md" _hover={{bg: "#2a6b6e",transform: "scale(1.05)",boxShadow: "0px 0px 10px rgba(42, 107, 110, 0.6)"}}
  _active={{bg: "#163d3e",boxShadow: "inset 0px 0px 5px rgba(22, 61, 62, 0.6)",}} onClick={onOpen1}>
                Publish
            </Button>
        </Flex>
        <Modal size={'sm'} isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent bg="#2E2E2E"
  border="1px solid #dcdcdc"
  boxShadow="0px 4px 15px #fffff060, 0px -4px 20px #f8dbe770"
color={'#d3d3d3'}
  borderRadius="md">
          <ModalHeader>Select atleast one Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex direction={'column'} gap={4} justifyContent={'space-around'} alignItems={'center'}>
          <Wrap spacing={2} justify={'center'} align={'center'} maxH={'40vh'} overflow={'scroll'}>
        {interests.map(interest => (
          <WrapItem key={interest} p={0}>
            <Button
              onClick={() => handleInterestClick(interest)}
              size={'sm'} whiteSpace={'pre-wrap'}
              colorScheme={selectedInterests.includes(interest) ? 'purple' : 'gray'}
              textAlign={'center'} w={'100px'} py={6}
                color={'#dcdcdc'}
                 _hover={{backgroundColor:'#ffffff60'}}
              variant={selectedInterests.includes(interest) ? 'solid' : 'outline'}
              >
              {interest}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      <Flex  justifyContent={'center'} alignItems={'center'} h={'200px'} w={'xs'} border={'2px'} rounded={'md'} position={'relative'}>
          <Input h={'200px'} type='file' accept='image/*' opacity={0} onChange={handleImageChange}/>
          <Flex rounded={'lg'} bgColor={'#191919'} pointerEvents={'none'} direction={'column'} gap={2} justifyContent={'center'} alignItems={'center'} position={'absolute'} top={0} left={0} w={'100%'} h={'100%'}>
            {temp ? <Image src={temp} alt='coverPic' layout='fill' />
            :
            coverpicurl.length > 0 ? <Image src={coverpicurl} alt='coverPic' layout='fill' />
            :
            <>
            <Text>Enter a cover pic</Text>
            <Icon as={EditIcon} boxSize={10} color="gray.500" />
            </>
            }
          </Flex>
      </Flex>
        </Flex>
          </ModalBody>
          <ModalFooter w={'100%'} display={'flex'} justifyContent={'space-around'}>
            <Button colorScheme='blue' mr={3} onClick={onClose1}>
              Close
            </Button>
            <Button isDisabled={(selectedInterests.length<1 || (coverpic==null && coverpicurl==null)) || pending} colorScheme='green' onClick={handlePublish}>Publish</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        <Modal size={'sm'} isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent bg="#2E2E2E"
  border="1px solid #dcdcdc"
  boxShadow="0px 4px 15px #fffff060, 0px -4px 20px #f8dbe770"
color={'#d3d3d3'}
  borderRadius="md">
          <ModalHeader>Select atleast one Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Flex direction={'column'} gap={4} justifyContent={'space-around'} alignItems={'center'}>
          <Wrap spacing={2} justify={'center'} align={'center'} maxH={'40vh'} overflow={'scroll'}>
        {interests.map(interest => (
          <WrapItem key={interest} p={0}>
            <Button
              onClick={() => handleInterestClick(interest)}
              size={'sm'} whiteSpace={'pre-wrap'}
              colorScheme={selectedInterests.includes(interest) ? 'purple' : 'gray'}
              textAlign={'center'} w={'100px'} py={6}
                color={'#dcdcdc'}
                 _hover={{backgroundColor:'#ffffff60'}}
              variant={selectedInterests.includes(interest) ? 'solid' : 'outline'}
              >
              {interest}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      <Flex  justifyContent={'center'} alignItems={'center'} h={'200px'} w={'xs'} border={'2px'} rounded={'md'} position={'relative'}>
          <Input h={'200px'} type='file' accept='image/*' opacity={0} onChange={handleImageChange}/>
          <Flex rounded={'lg'} bgColor={'#191919'} pointerEvents={'none'} direction={'column'} gap={2} justifyContent={'center'} alignItems={'center'} position={'absolute'} top={0} left={0} w={'100%'} h={'100%'}>
            {temp ? <Image src={temp} alt='coverPic' layout='fill' />
            :
            coverpicurl.length > 0 ? <Image src={coverpicurl} alt='coverPic' layout='fill' />
            :
            <>
            <Text>Enter a cover pic</Text>
            <Icon as={EditIcon} boxSize={10} color="gray.500" />
            </>
            }
          </Flex>
      </Flex>
        </Flex>
          </ModalBody>
          <ModalFooter w={'100%'} display={'flex'} justifyContent={'space-around'}>
            <Button colorScheme='blue' mr={3} onClick={onClose2}>
              Close
            </Button>
            <Button isDisabled={pending} colorScheme='green' onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default CreateHeader
