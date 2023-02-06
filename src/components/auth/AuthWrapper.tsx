import { fontWeight } from '@/theme/foundations';
import { Box, BoxProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends BoxProps {
  children: ReactNode;
  props?: BoxProps;
}
const AuthWrapper = ({ children, ...props }: Props) => {
  return (
    <Box
      border={{ base: 'none', md: '1px solid' }}
      borderColor={{ base: 'none', md: 'rgba(197, 197, 197, 0.5)' }}
      borderRadius={{ base: 'none', md: '10px' }}
      px={{ base: '46px', lg: '54px' }}
      py={{ base: 0, md: '31px' }}
      w={['full', '434px']}
      boxShadow='0px 7px 40px -20px rgba(26, 31, 76, 0.15)'
      {...props}
      sx={{
        '.chakra-form-control > p.chakra-text': {
          color: 'gray.300',
          fontWeight: fontWeight.medium,
          textStyle: 'sm'
        },
        'a.chakra-link': {
          fontWeight: 600
        },
        'form span': {
          fontWeight: 600,
          color: 'gray.300'
        }
      }}
    >
      {children}
    </Box>
  );
};

export default AuthWrapper;
