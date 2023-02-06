import { path } from '@/routes/path';
import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';

const ActivateAccountLink = () => {
  const userEmail = useReadLocalStorage('email');

  return (
    <>
      {userEmail === 'johnsmith@email.com' && (
        <Link
          to={path.ACCOUNT_ACTIVATION}
          as={ReactRouterLink}
          my={4}
          color='error'
          textDecor='underline'
          textStyle='lg'
          textAlign='center'
          id='activate-link'
        >
          Click to Activate your account
        </Link>
      )}
    </>
  );
};

export default ActivateAccountLink;
