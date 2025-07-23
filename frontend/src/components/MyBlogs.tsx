"use client"
import { Box, Tab, TabList, TabPanel, Tabs, TabPanels,TabIndicator } from '@chakra-ui/react'
import React, { useState } from 'react'
import CreatedBlogs from './CreatedBlogs'
import SaveBlogs from './SavedBlogs'
import DraftBlogs from './DraftBlogs'

const MyBlogs = () => {
    const [refresh, setrefresh] = useState(false)
  return (
    <Box bgImage={'/dark3.avif'} minH={'88vh'} color={'#dcdcdc'}>
        <Tabs variant={'enclosed'} >
            <TabList pt={2} px={2} backdropFilter={'4px'} backdropBlur={'4px'} bg='#88888820' >
                <Tab _selected={{border:'2px solid #0b7a4b', color:'#E0FFF4',boxShadow:"inset 0 0 20px #0b7a4b80, inset 0 0 30px #0b7a4b70, inset 0 0 40px #0b7a4b60"}} fontSize={'20px'} fontWeight={700} >Drafts</Tab>
                <Tab _selected={{border:'2px solid #0b7a4b', color:'#E0FFF4',boxShadow:"inset 0 0 20px #0b7a4b80, inset 0 0 30px #0b7a4b70, inset 0 0 40px #0b7a4b60"}} fontSize={'20px'} fontWeight={700}>Created</Tab>
                <Tab _selected={{border:'2px solid #0b7a4b', color:'#E0FFF4',boxShadow:"inset 0 0 20px #0b7a4b80, inset 0 0 30px #0b7a4b70, inset 0 0 40px #0b7a4b60"}} fontSize={'20px'} fontWeight={700}>Saved</Tab>
            </TabList> 
            <TabIndicator
        mt="-1.5px"
        height="2px"
        bg="teal.700"
        boxShadow={'0px 5px 5px #0B7A4B'}
        borderRadius="lg"
      />
            <TabPanels>
                <TabPanel>
                    <DraftBlogs refresh={refresh} setrefresh={setrefresh}/>
                </TabPanel>
                <TabPanel>
                    <CreatedBlogs refresh={refresh} setrefresh={setrefresh}/>
                </TabPanel>
                <TabPanel>
                    <SaveBlogs refresh={refresh} setrefresh={setrefresh}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>
  )
}

export default MyBlogs
