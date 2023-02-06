import { Suspense } from 'react';
import LendhaRouter from './routes';
import RemoveTrailingSlash from './utils/components/RemoveTrailingSlash';

const App = () => {
  return (
    <Suspense fallback={<p> Loading...</p>}>
      <RemoveTrailingSlash />
      <LendhaRouter />
    </Suspense>
  );
};

export default App;
