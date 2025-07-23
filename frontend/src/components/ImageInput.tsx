import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Icon, Input, Image } from '@chakra-ui/react';
import {EditIcon} from '@chakra-ui/icons'
type ImageInputProps={
    setFile:Dispatch<SetStateAction<File|null>>
}
const ImageInput: React.FC<ImageInputProps> = ({setFile}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files? event.target.files[0]:null;
    if(file){
        const url = URL.createObjectURL(file);
        setImage(url);
        setFile(file);
    }
  };

  return (
    <Box position="relative" pt={2}>
      <Input required type="file" accept="image/*" onChange={handleImageChange} opacity="0" position="absolute" top="0" left="0" width="100%" height="100%"
      cursor="pointer" zIndex="2"/>
      <Box pointerEvents={'none'} width="100px" height="100px" borderRadius="50%" overflow="hidden" border="2px solid" borderColor="gray.300" backgroundColor="gray.100" display="flex"
        justifyContent="center" alignItems="center" position="relative" cursor="pointer">
        {image ? (
          <Image src={image as string} alt="Preview" objectFit="cover" width="100%" height="100%" />
        ) : (
          <Icon as={EditIcon} boxSize={6} color="gray.500" />
        )}
      </Box>
    </Box>
  );
};

export default ImageInput;
