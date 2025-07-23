import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PassInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  return (
    <InputGroup>
      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        bgColor="#00000030"
        backdropBlur="lg"
        backdropFilter="blur(2px)"
        isRequired
      />
      <InputRightElement>
        <IconButton
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          onClick={handleToggle}
          variant="ghost"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PassInput;
