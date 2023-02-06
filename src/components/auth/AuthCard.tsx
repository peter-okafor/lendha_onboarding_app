import { ReactComponent as MobileLogo } from '@/assets/svg/logo/logo.svg';
import { AuthHeaderText } from '@/components/auth/AuthHeader';
import { Box, BoxProps, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import AuthWrapper from './AuthWrapper';

interface Props extends BoxProps {
  headerText?: string | ReactNode;
  subText?: ReactNode | string;
  children: ReactNode;
  textAlign?: 'left' | 'right' | 'center';
  props?: BoxProps;
}
const AuthCard = ({ headerText, subText, children, textAlign = 'left', ...props }: Props) => {
  return (
    <AuthWrapper {...props}>
      <Box display={{ base: 'flex', md: 'none' }} justifyContent='center' mb='33.30px'>
        <MobileLogo />
      </Box>
      <Box display='flex' justifyContent={{ base: 'center', md: 'normal' }} mb={['14px', '24px']}>
        <Stack
          textAlign={{ base: 'center', md: 'left' }}
          mb={4}
          mx={textAlign === 'center' ? 'auto' : 'initial'}
        >
          <AuthHeaderText
            text={
              <Text as='span' whiteSpace='nowrap'>
                {headerText}
              </Text>
            }
          />
          <Box textStyle='sm' textAlign={textAlign}>
            {subText}
          </Box>
        </Stack>
      </Box>
      {children}
    </AuthWrapper>
  );
};

export default AuthCard;
