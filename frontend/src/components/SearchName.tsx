import { searchbyname } from '@/libs/user'
import { RepeatIcon, SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Heading, IconButton, Input, Tooltip } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
type SearchNameProps={
    setblogs:Dispatch<SetStateAction<any>>
    toggle:Dispatch<SetStateAction<boolean>>
}
const SearchName:React.FC<SearchNameProps> = ({setblogs,toggle}) => {
    const [name, setname] = useState('')
    const handleSearch= async ()=>{
        const response = await searchbyname(name);
        if(response.success){
            setblogs(response.message.blogs)
        }
    }
  return (
    <Flex gap={4} direction={'column'} color={'#dcdcdc'}>
        <Heading fontWeight={700} color='#d3d3d3'>Search by Name</Heading>
        <Flex gap={3}>
        <Input color={'#d3d3d3'} value={name} onChange={(e)=>setname(e.target.value)}/>
        <Button px={8} py={2} leftIcon={<SearchIcon/>} onClick={handleSearch}>Search</Button>
        <Tooltip label='Search by Tags' aria-label='a tooltip'>
        <IconButton aria-label='swap' icon={<RepeatIcon/>} onClick={()=>toggle(prev=>!prev)}/>
        </Tooltip>
        </Flex>
    </Flex>
  )
}

export default SearchName
