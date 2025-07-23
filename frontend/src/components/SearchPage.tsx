"use client"
import { Box, Button, Divider,Heading, Text, VStack, Wrap, } from '@chakra-ui/react'
import React,{useState} from 'react'
import SearchName from './SearchName';
import SearchTags from './SearchTags';
import MyBlogCard from './MyBlogCard';
const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [toggle, settoggle] = useState(true)
  return (
    <Box p={8} bgImage={'/dark3.avif'} minH={'91vh'}>
      <VStack spacing={6}>
        {
            toggle?
            <SearchName setblogs={setSearchResults} toggle={settoggle}/>
            :
            <SearchTags setblogs={setSearchResults} toggle={settoggle}/>
        }
<Divider/>
        <Box w="full" color={'#dcdcdc'}>
          <Heading fontSize={'30px'} mb={4}>
            Search Results
          </Heading>
          <Wrap spacing={4} align="stretch">
            {searchResults &&  searchResults.length > 0 ? (
              searchResults.map((blog:any) => (
                <MyBlogCard type='view' key={blog._id} blog={blog} />
              ))
            ) : (
              <Text>No blogs found</Text>
            )}
          </Wrap>
        </Box>
      </VStack>
    </Box>
  )
}

export default SearchPage
