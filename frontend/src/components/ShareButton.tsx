import { Button, useClipboard, Tooltip, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { CopyIcon } from '@chakra-ui/icons';

interface ShareButtonProps {
  id: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ id }) => {
  const { hasCopied, onCopy } = useClipboard(`https://blog-wave-snowy.vercel.app//blog/${id}`);
  const [tooltipLabel, setTooltipLabel] = useState('Copy link');

  const handleClick = () => {
    onCopy();
    setTooltipLabel('Link copied!');
    setTimeout(() => setTooltipLabel('Copy link'), 2000);
  };

  return (
    <Tooltip label={tooltipLabel} hasArrow>
      <IconButton
      aria-label='copy'
        icon={<CopyIcon />}
        onClick={handleClick}
        colorScheme="white"
        variant="outline"
      />
    </Tooltip>
  );
};

export default ShareButton;
