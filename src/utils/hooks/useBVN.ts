import { useEffect, useState } from 'react';

function useBVN(bvn: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (bvn.length > 11) {
      return;
    }
    // const regex = /^\d{11}$/;

    setValue(bvn);
  }, [bvn]);

  return value;
}

export default useBVN;
