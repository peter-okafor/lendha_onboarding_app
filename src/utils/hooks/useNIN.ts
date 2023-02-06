import { useEffect, useState } from 'react';

function useNIN(nin: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (nin.length > 11) {
      return;
    }

    setValue(nin);
  }, [nin]);

  return value;
}

export default useNIN;
