import React from 'react'
import { ButtonGroup, Editable,EditableInput,EditablePreview, Flex, IconButton, useEditableControls,Input } from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
type EditControlProps={
    handleSubmit:(value:string)=>void
}
const EditableControls:React.FC<EditControlProps>=({handleSubmit})=>{
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        // Trigger the handleSubmit function
        //handleSubmit();
    
        // Trigger the original submit button behavior
        getSubmitButtonProps().onClick?.(event);
      };
    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm' ml={2}>
        <IconButton aria-label='check' icon={<CheckIcon />} {...getSubmitButtonProps()} />
        
        <IconButton aria-label='close' icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        
        <IconButton
                aria-label="Edit Contact Details"
                icon={<EditIcon />}
                size="sm"
                variant="ghost"
                ml={2}
                {...getEditButtonProps()}
              />
      </Flex>
    )
  }
type EditProps={
    value: string,
    onEdit: (newValue:string) => void;
    size?:string
}
const CustomEdit:React.FC<EditProps> = ({value,onEdit,size}) => {
  return (
    <Editable
    display={'flex'}
      textAlign='center'
      defaultValue={value}
      fontSize={size||"md"} ml={2}
      isPreviewFocusable={false}
      onSubmit={onEdit}
    >
      <EditablePreview />
      <Input as={EditableInput} />
      <EditableControls handleSubmit={onEdit} />
    </Editable>
  )
}

export default CustomEdit