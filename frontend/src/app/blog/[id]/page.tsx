import BlogView from '@/components/BlogView'
import { Box } from '@chakra-ui/react'
import React from 'react'
type PageProps={
    params:{
        id:string
    },
    searchParams:any
}
const page:React.FC<PageProps> = ({params,searchParams}) => {
    const {id} = params;
    const auth=searchParams.unauth??'true'
  return (
    <Box minH={'100vh'} w={'100vw'} bgImage={'/dark3.avif'}>
    <BlogView auth={auth} id={id}/>
    </Box>
  )
}

export default page