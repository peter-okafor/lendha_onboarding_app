import { Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import LendhaRouter from './routes';
import RemoveTrailingSlash from './utils/components/RemoveTrailingSlash';
import logo from '@/assets/svg/logo/logo-blue-mobile.svg';

const App = () => {
  return (
    <Suspense
      fallback={
        <p
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Spinner size='xl'>
            <img src={logo} alt='logo' width='150px' height='150px' />
          </Spinner>
        </p>
      }
    >
      <>
        <RemoveTrailingSlash />
        <LendhaRouter />
      </>
    </Suspense>
  );
};

export default App;
