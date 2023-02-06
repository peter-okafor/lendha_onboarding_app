import { AuthHeaderText } from '@/components/auth/AuthHeader';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface UserAccountBlockedProps {
  children: ReactNode;
  handleBackToLogin: () => void;
}
const UserAccountBlocked = ({ children, handleBackToLogin }: UserAccountBlockedProps) => {
  return (
    <Flex justifyContent='center'>
      <Stack mb={4} spacing={4} textAlign='center'>
        <AuthHeaderText text='Account Blocked' />
        {children}
        <Box mx='auto'>
          <Button size='md' type='submit' w='100%' onClick={handleBackToLogin}>
            back to login
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default UserAccountBlocked;
