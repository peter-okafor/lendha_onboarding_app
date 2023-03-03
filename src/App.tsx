import { Suspense } from 'react';
import LoaderSuspense from './components/common/LoaderSuspense';
import LendhaRouter from './routes';
import RemoveTrailingSlash from './utils/components/RemoveTrailingSlash';

const App = () => {
  return (
    <Suspense fallback={<LoaderSuspense />}>
      <RemoveTrailingSlash />
      <LendhaRouter />
    </Suspense>
  );
};

export default App;
