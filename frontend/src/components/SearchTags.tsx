import { searchbytags } from '@/libs/user';
import bloginterests from '@/utils/blogtags';
import { AddIcon, CloseIcon, RepeatIcon, SearchIcon } from '@chakra-ui/icons';
import { Button, Flex,Heading,IconButton,Popover,PopoverArrow,PopoverBody,PopoverCloseButton,PopoverContent,PopoverHeader,PopoverTrigger,Tag,TagLabel,Text, Tooltip } from '@chakra-ui/react'
import React,{Dispatch, SetStateAction, useState} from 'react'
const tagsList = bloginterests
  type SearchTagProps={
    setblogs:Dispatch<SetStateAction<any>>
    toggle:Dispatch<SetStateAction<boolean>>
}
const colors = ['red.300','cyan.300','green.300']
const SearchTags:React.FC<SearchTagProps> = ({setblogs,toggle}) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag:string) => {
    setSelectedTags((prevTags:string[]) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };
  const handleSearch= async ()=>{
    const response = await searchbytags(selectedTags);
    if(response.success){
        setblogs(response.message.blogs)
    }
}
  return (
    <Flex direction={'column'} gap={4} color={'#dcdcdc'}>
          <Heading fontWeight={700} color={'#dcdcdc'} textAlign={'center'}>
            Search by Tags
          </Heading>
          <Flex alignItems={'center'} gap={4} direction={['column-reverse','row-reverse']}>
          <Flex wrap={'wrap'} gap={2} maxH={'40vh'} overflow={'scroll'}>
            {
                selectedTags.length > 0 ? selectedTags.map((tag:string,index:number)=>(
                    <Tag
                    size="lg"
                    key={tag}
                    bg={colors[index%3]}
                    color='#191919'
                    cursor="pointer"
                    py={2} px={3}
                    rounded={'full'}
                    display={'flex'}
                    gap={2}
                    justifyContent={'space-around'}
                  >
                    <TagLabel>{tag}</TagLabel>
                    
                    <IconButton variant={'none'} size={'xs'} aria-label='remove' icon={<CloseIcon/>} onClick={() => handleTagToggle(tag)}/>
                  </Tag>
                ))
                :
                <Text fontSize={'lg'}>No tags selected</Text>
                
            }
          </Flex>
          <Popover>
  <PopoverTrigger>
          <Button leftIcon={<AddIcon/>}>Add tags</Button>
  </PopoverTrigger>
  <PopoverContent color={'#dcdcdc'} maxW={'70vw'} bg='#191919' maxH={'60vh'} rounded={'xl'} overflow={'scroll'}  border={'1px solid #7df9ff'}>
    <PopoverArrow bg='#f5f5f5' />
    <PopoverCloseButton />
    <PopoverHeader>
          <Heading fontSize={'30px'}>Select Tags</Heading>
        </PopoverHeader>
        <PopoverBody>
          <Flex wrap="wrap" gap={2}>
            {tagsList.map((tag) => (
                <Tag
                size="lg"
                key={tag}
                variant={selectedTags.includes(tag) ? "solid" : "outline"}
                colorScheme={selectedTags.includes(tag) ? "teal" : "gray"}
                cursor="pointer"
                onClick={() => handleTagToggle(tag)}
                >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Flex>
        </PopoverBody>
  </PopoverContent>
</Popover>
    </Flex>
<Flex direction={'row'} gap={2}>
<Button leftIcon={<SearchIcon/>} onClick={handleSearch} py={2} px={6}>Search</Button>
<Tooltip label='Search by Name' aria-label='a tooltip'>
<IconButton aria-label='swap' icon={<RepeatIcon/>} onClick={()=>toggle(prev=>!prev)}/>
</Tooltip>
</Flex>
    </Flex>
  )
}

export default SearchTags
