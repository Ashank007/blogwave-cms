import React, { FormEvent, useState } from 'react'
import { Box, FormControl, FormLabel, Input, Button, VStack, Heading, Divider } from '@chakra-ui/react'
import ImageInput from './ImageInput'
import Interest from './Interest';
type ProfileProps={
  email: string
}
const ProfileForm: React.FC<ProfileProps> = ({email}) => {
    const [name, setname] = useState('');
    const [profile, setprofile] = useState(false);
    const [file, setfile] = useState<File|null>(null)
    const [image, setimage] = useState('');
    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       if (!file) return;
       
       const formData = new FormData();
       formData.append('file', file);
       formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET??'');
       
       try {
         const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL??'', {
           method: 'POST',
           body: formData,
          });
          const data = await response.json();
          setimage(data.secure_url);
          setprofile(true);
        } catch (error) {
        }
      }
  return (
    <>
    {!profile?
      <form onSubmit={handleSubmit}>
        <Heading textAlign={'center'}>Profile</Heading>
        <VStack spacing={2}>
        <ImageInput setFile={setfile}/>
        <FormControl>
            <FormLabel color={'white'}>Name</FormLabel>
            <Input aria-required name='name' value={name} onChange={(e)=>{setname(e.target.value)}} backdropBlur={'lg'} backdropFilter={'blur(2px)'} bgColor={'#00000030'} type='text' isRequired/>
        </FormControl>
        <Button mt={3} type='submit' colorScheme='teal'>Register</Button>
        </VStack>
    </form>
    :
    <>
    <Interest name={name} image={image} email={email}/>
    </>
    }
    </>
  )
}

export default ProfileForm