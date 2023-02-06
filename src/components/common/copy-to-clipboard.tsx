import { globalStyles } from '@/theme/styles';
import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';
import { useCopyToClipboard } from 'usehooks-ts';

interface Props {
  text: string;
}
const CopyToClipboard = ({ text = '' }: Props) => {
  const [, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopy = (val: string) => {
    copy(val).then(() => {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };

  return (
    <Box
      display='inline-flex'
      pos='relative'
      alignItems='center'
      justifyContent='center'
      bgColor={`${globalStyles.colors.darkblue.DEFAULT}10`}
      cursor='pointer'
      h='22px'
      minW='66px'
      gap={1}
      onClick={() => handleCopy(text)}
      userSelect='none'
      borderRadius='3px'
    >
      <Text as='span' textStyle={['xs', 'sm']} color='darkblue.DEFAULT'>
        {copied ? 'Copied' : 'Copy'}
      </Text>
      {copied ? null : <RiFileCopyLine color={`${globalStyles.colors.darkblue.DEFAULT}`} />}
    </Box>
  );
};

export default CopyToClipboard;
