import { Link, Stack, SystemProps, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface Props {
  justify?: SystemProps['justifyContent'];
  text?: string;
}
const AuthResendCodeLink = ({ justify = 'center', text = 'Resend' }: Props) => {
  return (
    <Stack direction='row' justify={justify} textStyle='sm' spacing={1}>
      <Text as='span'>Didn&apos;t receive code?</Text>
      <Link as={ReactRouterLink} color='darkblue.DEFAULT' to='#' fontWeight={600}>
        {text}
      </Link>
    </Stack>
  );
};

export default AuthResendCodeLink;
