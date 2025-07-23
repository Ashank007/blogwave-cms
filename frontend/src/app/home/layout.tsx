import Nav from '@/components/Nav';
import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
interface ProfileLayoutProps {
  children: ReactNode;
  params : {id:string}
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children, params }) => {
  return (
    <Box maxW={'100vw'} p={0} m={0} overflowX={'hidden'}>
        <Nav/>
        <Box>
            {children}
        </Box>
    </Box>
  );
};

export default ProfileLayout;
