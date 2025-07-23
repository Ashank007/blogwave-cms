import { Box } from '@chakra-ui/react'
import React from 'react'
export type Icon={
  image: string
}
const CustomIcons:React.FC<Icon> = ({image}) => {
  return (
    <Box
    as="span"
    display="inline-block"
    width={['12px',"20px"]}
    height={['12px',"20px"]}
    backgroundImage={image}
    backgroundSize="cover"
/>
  )
}

export default CustomIcons