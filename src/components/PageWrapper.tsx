import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  display?: 'mobile' | 'tablet' | 'desktop' | '*';
  children: ReactNode;
}
export const PageWrapper = ({ display = 'desktop', children }: Props) => {
  return (
    <>
      {display === 'mobile' && (
        <Box pb={0} display={{ base: 'block', lg: 'none' }}>
          {children}
        </Box>
      )}
      {display === 'tablet' && (
        <Box pb={0} display={{ base: 'none', md: 'block' }}>
          {children}
        </Box>
      )}
      {display === 'desktop' && (
        <Box pb={0} display={{ base: 'none', lg: 'block' }}>
          {children}
        </Box>
      )}

      {display === '*' && (
        <Box pb={0} display={{ base: 'block' }}>
          {children}
        </Box>
      )}
    </>
  );
};
