import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface AuthHeaderProps {
  text: ReactNode | string;
}
export const AuthHeaderText = ({ text }: AuthHeaderProps) => {
  return (
    <Box
      textStyle={{ base: '2xl', md: '3xxl' }}
      fontFamily='Poppins'
      color='darkblue.DEFAULT'
      sx={{ fontWeight: '500 !important' }}
    >
      {text}
    </Box>
  );
};
