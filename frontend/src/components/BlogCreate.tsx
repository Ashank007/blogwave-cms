"use client"
import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { createBlog, createDraft, getDraftbyTitle } from '@/libs/user';
import CreateHeader from './CreateHeader';
import '@/components/quill.css'
import '@/utils/customBlots'
import { AddIcon, AttachmentIcon, ExternalLinkIcon, UpDownIcon } from '@chakra-ui/icons';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCode, FaFileAudio, FaImage, FaViacoin, FaVideo } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
const BlogCreate = () => {
  const query = useSearchParams();
  const [title, settitle] = useState('');
  const [value, setValue] = useState('');
  const [selectedInterests, setselectedInterests] = useState<string[]>([]);
  const [coverpic, setcoverpic] = useState<File|null>(null)
  const [coverpicUrl, setcoverpicUrl] = useState('');
  const [edit, setedit] = useState(false);
  const [pending, setpending] = useState(false)
  useEffect(() => {
    const fetchDraft= async ()=>{
      if(query.get('draft')){
        const drafttitle = query.get('draft');
        const response = await getDraftbyTitle(drafttitle??'');
        if(response.success){
          setedit(true);
          setValue(response?.message?.blog?.para);
          settitle(response?.message?.blog?.title);
          setselectedInterests(response?.message?.blog?.tags??[]);
          setcoverpicUrl(response?.message?.blog?.coverpic??'');
        }
      }
   }
   fetchDraft();
  }, [query])
  
  const quillref = useRef<ReactQuill>(null);
  const uploadImage = async (file:File):Promise<string>=>{
    const formData = new FormData();
       formData.append('file', file);
       formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET??'');
       
       try {
         const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL??'', {
           method: 'POST',
           body: formData,
          });
          const data = await response.json();
          return data.secure_url;
        } catch (error) {
          return '';
        }
  }
  const insertCodeBlock = () => {
    const editor = quillref.current?.getEditor();
    if(editor) {
      editor.format('code-block', true);
    }
  };
  useEffect(() => {
    const quillEditor = quillref.current?.getEditor();
    const toolbar = quillEditor?.getModule('toolbar') as any;


    if (toolbar && typeof toolbar.addHandler === 'function') {
      toolbar.addHandler('code-block', insertCodeBlock);
    }
  }, []);
  const [doc, setdoc] = useState<Document|null>(null)
  useEffect(() => {
    setdoc(document);
  }, [])
  
  const [temporaryImages, setTemporaryImages] = useState<{ file: File, url: string }[]>([]);

  const handleImageUpload = () => {
    if (doc) {
      const input = doc.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = () => {
        const file = input.files ? input.files[0] : null;
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            setTemporaryImages(prev => [...prev, { file, url: base64data }]);

            const quill = quillref.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              if(range){
                quill.insertEmbed(range.index, 'image', base64data);
                quill.insertText(range.index+1, '\n', 'user');
                quill.setSelection(range.index + 2,0);
                quill.focus();
              }
              else{
                quill.insertEmbed(0, 'image', base64data);
                quill.insertText(1, '\n', 'user');
                quill.setSelection(2,0);
                quill.focus();
              }
            }
          };
          reader.readAsDataURL(file);
        }
      };
    }
  };
  const handleSubmit = async () => {
    setpending(true);
    const quill = quillref.current?.getEditor();
    if (quill) {
      let htmlContent = quill.root.innerHTML;
      const base64ImageRegex = /data:image\/[a-zA-Z]*;base64,[^"]*/g;
      const base64Images = htmlContent.match(base64ImageRegex) || [];
      for (const base64Url of base64Images) {
        const file = await fetch(base64Url)
          .then(res => res.blob())
          .then(blob => new File([blob], 'image.png', { type: blob.type }));
        const permanentUrl = await uploadImage(file);
        if (permanentUrl) {
          htmlContent = htmlContent.replace(base64Url, permanentUrl);
        }
      }
      if(coverpic){
        const coverperma = await uploadImage(coverpic);
        const response = await createBlog(title, htmlContent,selectedInterests,coverperma);
        if(response.success){
          toast.success(response.message);
          setpending(false)
        }
        else{
          toast.error(response.message);
          setpending(false)
        }
      }else{
        const response = await createBlog(title, htmlContent,selectedInterests,coverpicUrl);
        if(response.success){
          toast.success(response.message);
          setpending(false)
        }
        else{
          toast.error(response.message);
          setpending(false)
        }
      }
    }
  };
  
  const handleSave= async ()=>{
    setpending(true);
    const quill = quillref.current?.getEditor();
    if (quill) {
      let htmlContent = quill.root.innerHTML;
      const base64ImageRegex = /data:image\/[a-zA-Z]*;base64,[^"]*/g;
      const base64Images = htmlContent.match(base64ImageRegex) || [];
      for (const base64Url of base64Images) {
        const file = await fetch(base64Url)
          .then(res => res.blob())
          .then(blob => new File([blob], 'image.png', { type: blob.type }));
        const permanentUrl = await uploadImage(file);
        if (permanentUrl) {
          htmlContent = htmlContent.replace(base64Url, permanentUrl);
        }
      }
      if(coverpic){
        const coverperma = await uploadImage(coverpic);
        const response = await createDraft(title, htmlContent,selectedInterests,coverperma);
        if(response.success){
          toast.success(response.message);
          setpending(false)
        }
        else{
          toast.error(response.message);
          setpending(false)
        }
      }else{
        const response = await createDraft(title, htmlContent,selectedInterests,coverpicUrl);
        if(response.success){
          toast.success(response.message);
          setpending(false)
        }
        else{
          toast.error(response.message);
          setpending(false)
        }
      }
    }
  }
  const embedHandler = () => {
    if (embed) {
      const quill = quillref.current?.getEditor();
      if(quill){
        const range = quill.getSelection(true);
        quill.insertText(range.index, '\n', 'user');
      quill.insertEmbed(range.index , 'embed', embed, 'user');
      quill.setSelection(range.index + 2, 0);
      }
    }
  };
  const youtubeHandler = () => {
    if (yturl) {
      const quill = quillref.current?.getEditor();
      if(quill){
        const range = quill.getSelection(true);
        quill.insertText(range.index, '\n', 'user');
      quill.insertEmbed(range.index , 'youtube', yturl, 'user');
      quill.setSelection(range.index + 2, 0);
      }
    }
  };
  const spotifyHandler = () => {
    if (spturl) {
      const quill = quillref.current?.getEditor();
      if(quill){
        const range = quill.getSelection(true);
        quill.insertText(range.index, '\n', 'user');
      quill.insertEmbed(range.index , 'spotify', spturl, 'user');
      quill.setSelection(range.index + 2, 0); 
      }
    }
  };
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['blockquote','link'],
        ['clean']
      ],
      handlers: {
        
      }
    }
  }), []);

  const {isOpen:isOpen1, onOpen:onOpen1, onClose:onClose1}= useDisclosure();
  const {isOpen:isOpen2, onOpen:onOpen2, onClose:onClose2}= useDisclosure();
  const {isOpen:isOpen3, onOpen:onOpen3, onClose:onClose3}= useDisclosure();
  const menubtn = useRef<HTMLButtonElement>(null)
  const [yturl, setyturl] = useState('')
  const [embed, setembed] = useState('');
  const [spturl, setspturl] = useState('')
  return (
    <Flex maxW={'100vw'} alignItems={'center'} flexDirection={'column'} bgImage={'/dark3.avif'} minH={'90vh'}  overflowX={'hidden'}>
      <CreateHeader pending={pending} edit={edit} coverpicurl={coverpicUrl} coverpic={coverpic} setcoverpic={setcoverpic} selectedInterests={selectedInterests} setSelectedInterests={setselectedInterests} handlePublish={handleSubmit} handleSave={handleSave}/>
      <Box rounded={'lg'}  backdropBlur={'lg'}  maxW={'90vw'}
       bg="#0a0a0a0" 
       border="2px solid"
       borderColor="#28a745" 
       boxShadow="0px 0px 10px 2px rgba(40, 167, 69, 0.4)"
       borderRadius="md"
       p={4}
       _hover={{
        borderColor: "#5ec17a", 
        boxShadow: "0px 0px 15px rgba(94, 193, 122, 0.6)",
       }}
      
      backdropFilter="blur(3px)"
      borderBottom={'0px'} minW={'70vw'} minH={'70vh'} borderTop={'2px'} borderLeft={'2px'} borderRight={'2px'}>
        <Input ml={'1%'} color={'#dcdcdc'} fontSize={'35px'} placeholder='Title' _placeholder={{color:'#dcdcdc'}} border={0} variant={'unstyled'} name='title' value={title} type='text' onChange={(e)=>settitle(e.target.value)}/>      
        <ReactQuill
        value={value} onChange={setValue} ref={quillref} theme='bubble' modules={modules} placeholder='Let the magic begin...'/>
          <Flex align={'center'} ml={'1%'}>
        <Menu closeOnBlur={false} closeOnSelect={false} placement='right' onOpen={()=>{
          if(menubtn.current){
            menubtn.current.style.transform = 'rotate(45deg)';
          }
        }}
        onClose={()=>{
          if(menubtn.current){
            menubtn.current.style.transform = 'rotate(0deg)';
          }
        }}
        initialFocusRef={menubtn}
        >

        <MenuButton border={'2px'} ref={menubtn} as={IconButton}icon={<AddIcon/>} colorScheme="blue" mt={4} rounded={'full'} bg="#dcdcdc" // Darker background to differentiate the icon area
  borderRadius="full"
  p={2}
  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.5)"
  _hover={{
    boxShadow: "0px 0px 10px rgba(144, 224, 239, 0.8)",
    transform: "scale(1.1)",
  }} backdropFilter="blur(3px)" backdropBlur={'blur(3px)'} />
        <MenuList flexWrap={'wrap'} gap={0} border={'0px'} bg={'none'} display="flex" flexDirection="row" width={'70vw'}>
          <MenuItem w={'fit-content'} bg={'none'}  onClick={handleImageUpload}>
          <Tooltip label='image'>
          <IconButton aria-label='image' icon={<FaImage/>} />
          </Tooltip>
          </MenuItem>
          <MenuItem w={'fit-content'} bg={'none'}>
          <Tooltip label='embed'>
             <IconButton aria-label='embed' onClick={onOpen1} transform={'rotate(90deg)'} icon={<UpDownIcon/>}/>
          </Tooltip>
          </MenuItem>
          <MenuItem w={'fit-content'} bg={'none'}>
          <Tooltip label='youtube'>
             <IconButton aria-label='embed' onClick={onOpen2} icon={<FaVideo/>}/>
          </Tooltip>
          </MenuItem>
          <MenuItem w={'fit-content'} bg={'none'}>
          <Tooltip label='spotify'>
             <IconButton aria-label='embed' onClick={onOpen3} icon={<FaFileAudio/>}/>
          </Tooltip>
          </MenuItem>
          <MenuItem w={'fit-content'} bg={'none'}  onClick={insertCodeBlock}>
          <Tooltip label='code block'>
          <IconButton aria-label='code-block' icon={<FaCode/>}/>
          </Tooltip>
          </MenuItem>
        </MenuList>
      </Menu>
          </Flex>
      </Box>
      <Popover isOpen={isOpen1} onClose={onClose1} >
            <PopoverTrigger><span></span>
            </PopoverTrigger>
          <Portal>
  <PopoverContent bg="#2B2B2B" borderColor="#434343" color="white">
  <PopoverArrow bg="#2B2B2B" />
  <PopoverHeader borderBottomColor="#434343" fontWeight="bold">Enter embed!</PopoverHeader>
  <PopoverCloseButton color="white" />
  <PopoverBody>
    <Input value={embed} onChange={(e) => setembed(e.target.value)} placeholder="Paste your embed" type="text" bg="#1C1C1C"
     borderColor="#434343" color="white" _placeholder={{ color: "#A0A0A0" }} _focus={{ borderColor: "#6A057270", boxShadow: "0 0 10px 0px #d3d3d3" }}/>
  </PopoverBody>
  <PopoverFooter display={'flex'} borderTopColor="#434343" justifyContent={'space-around'} gap={2}>
    <Button flex={1} onClick={embedHandler} bg="#434343" color="white"_hover={{ bg: "#191919" }}>
      Submit
    </Button>
    <Button flex={1} onClick={onClose1} bg="#EF5350" color="white" _hover={{ bg: "#B71C1C" }}>
      Close
    </Button>
  </PopoverFooter>
</PopoverContent>

          </Portal>
          </Popover>
      <Popover isOpen={isOpen2} onClose={onClose2} >
            <PopoverTrigger><span></span>
            </PopoverTrigger>
          <Portal>
            <PopoverContent bg="#2B2B2B" borderColor="#434343" color="white">
              <PopoverArrow />
              <PopoverHeader borderBottomColor="#434343" fontWeight="bold">Enter youtube link!</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
              <Input  value={yturl} onChange={(e)=>setyturl(e.target.value)} placeholder='Paste your yt video link' type='text' bg="#1C1C1C"
              borderColor="#434343" color="white" _placeholder={{ color: "#A0A0A0" }} _focus={{ borderColor: "#6A057270", boxShadow: "0 0 10px 0px #d3d3d3" }}/>
              </PopoverBody>
              <PopoverFooter display={'flex'} borderTopColor="#434343" justifyContent={'space-around'} gap={2}>
                <Button  flex={1} bg="#434343" color="white"_hover={{ bg: "#191919" }} onClick={youtubeHandler}>Submit</Button>
                <Button flex={1} onClick={onClose1} bg="#EF5350" color="white" _hover={{ bg: "#B71C1C" }}>
                  Close
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
          </Popover>
      <Popover isOpen={isOpen3} onClose={onClose3} >
            <PopoverTrigger><span></span>
            </PopoverTrigger>
          <Portal>
            <PopoverContent bg="#2B2B2B" borderColor="#434343" color="white">
              <PopoverArrow />
              <PopoverHeader borderBottomColor="#434343" fontWeight="bold">Enter spotify music link!</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
              <Input value={spturl} onChange={(e)=>setspturl(e.target.value)} placeholder='Paste your spotify music link' type='text' bg="#1C1C1C"
              borderColor="#434343" color="white" _placeholder={{ color: "#A0A0A0" }} _focus={{ borderColor: "#6A057270", boxShadow: "0 0 10px 0px #d3d3d3" }}
               />
              </PopoverBody>
              <PopoverFooter display={'flex'} borderTopColor="#434343" justifyContent={'space-around'} gap={2}>
                <Button flex={1} bg="#434343" color="white" _hover={{ bg: "#191919" }} onClick={spotifyHandler}>Submit</Button>
                <Button flex={1} onClick={onClose1} bg="#EF5350" color="white" _hover={{ bg: "#B71C1C" }}>
                  Close
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
          </Popover>
          <ToastContainer/>
    </Flex>
  )
}

export default BlogCreate