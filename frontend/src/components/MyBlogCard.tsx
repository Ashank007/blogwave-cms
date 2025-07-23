import { deleteBlog, deleteDraft, saveblog } from '@/libs/user';
import { Box, Image, Text, Flex, Icon, HStack, Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
type blogType ='draft'|'create'|'save'| 'view'
interface BlogCardProps {
  blog:any
  type:blogType
  refr?:boolean
  refresh?: Dispatch<SetStateAction<boolean>>
}
const SaveIcon:React.FC= () => {
  return (
    <Box
    as="span"
    display="inline-block"
    width={["50px"]}
    height={["50px"]}
    backgroundImage={'/cardsave.png'}
    backgroundSize="cover"
/>
  )
}
const CustomIcon:React.FC<{image:string}> = ({image}) => {
  return (
    <Box
    as="span"
    display="inline-block"
    width={["20px"]}
    height={["20px"]}
    backgroundImage={image}
    backgroundSize="cover"
/>
  )
}
const MyBlogCard: React.FC<BlogCardProps> = ({ blog,type,refresh, refr }) => {
  const [save, setsave] = useState(false);
  useEffect(() => {
    const checkSave= async()=>{
      const response = await saveblog(blog._id,false);
      if(response.success){
        setsave(response.message.saved);
      }
    }
    checkSave();
  }, [blog._id,refr])
  const handleSave = async ()=>{
    const response = await saveblog(blog._id,true);
    if(response.success){
      setsave(response.message.saved);
      refresh && refresh(prev=>!prev);
    }
  }
  const handledelete =  async () => {
    if(type=='draft'){
      const response = await deleteDraft(blog.title);
      if (response?.success) {
        refresh && refresh(prev=>!prev);
      } else {
        
      }
    }else{
      const response = await deleteBlog(blog._id);
      if(response.success){
        refresh && refresh(prev=>!prev);
      }
      else{

      }
    }
  };
  let href:string
  if(type=='draft') href=`/home/create?draft=${blog.title}`
  else href=`/blog/${blog._id}`
  return (
    <Flex 
      direction="column"
      border="1px solid #0b7a4b"
      borderRadius="lg"
      backdropBlur={'5px'}
      backdropFilter={'blur(4px)'}
      bgColor={'rgba(60, 100, 150, 0.6)'}
      color={'#dcdcdc'}
      overflow="hidden"
      maxW="sm"
      minW={'200px'}
      p={3}
      boxShadow="inset 2px 2px 2px #0b7a4b, 5px 5px 6px #ffffff40, inset 10px 10px 10px 0px #ffffff20"
      _hover={{boxShadow:'0px 0px 0px #ffffff40, inset 5px 5px 100px #ffffff20'}}
      position={'relative'}
    >
      {
        type!='save' && type!='view' &&

        <Box bg="rgba(211, 47, 47, 0.4)" backdropFilter="blur(10px)" border="2px solid #0b7a4b" cursor={'pointer'}
        onClick={handledelete} position={'absolute'} top={0} left={0} w={'50px'} h={'50px'} borderBottomRightRadius={'100px'} 
        boxShadow="4px 4px 25px rgba(0, 0, 0, 1)"
        _hover={{width:'60px', height:'60px', transition:'0.5s all', padding:'18px',transform:'scale(1.8)',bg: "rgba(211, 47, 47, 0.6)",backdropFilter: "blur(12px)"}} display={'flex'} p={'10px'}>
        <CustomIcon image='/delete.png'/>
      </Box>
      }
      {type!='draft' &&
        <Box position={'absolute'} top={'-5px'} right={'10px'} w='50px' h='50px' >
      <Button transition={'1px all'} transform={!save?'translateY(-20px)':''} variant={'none'} onClick={handleSave}><SaveIcon/></Button>
      </Box>
      }
      <Image 
        src={blog.coverpic} 
        border='1px solid #c0c0c0'
        alt={blog.title} 
        boxShadow={'5px 5px 6px #000'}
        objectFit="cover" 
        w="100%" 
        h="200px" 
        rounded={'lg'}
      />
      <Flex p={4} justifyContent={'space-between'} alignItems={'center'} gap={8}>
        <Link href={href}>
        <Text 
          fontSize="xl" 
          fontWeight="bold" 
          noOfLines={3}
          >
          {blog.title.length>20?blog.title.slice(0,17)+'...':blog.title}
        </Text>
          </Link>
        {
          type!='draft' &&
          <Flex gap={2}>
        <Flex alignItems={'center'} gap={1}>
                            {
                              blog.liked?
                              <CustomIcon image={'/heart2.png'}/>
                                :
                                <CustomIcon image={'/heart2unlike.png'}/>
                            }
                        <Text fontSize={['12px','20px']}>{blog.likes.length}</Text>
                        </Flex>
                        <Flex alignItems={'center'} gap={1}>
                        <CustomIcon image='/comment.png'/>
                        <Text fontSize={['12px','20px']}>{blog.comments.length}</Text>
                        </Flex>
        </Flex>
    }
      </Flex>
    {type!='draft' && 
      <Box px={4}>
    <Text>{blog.views.length} {blog.views.length>1?'persons have':'person has'} viewed it</Text>
      </Box>
    }
    </Flex>
  );
};

export default MyBlogCard;
