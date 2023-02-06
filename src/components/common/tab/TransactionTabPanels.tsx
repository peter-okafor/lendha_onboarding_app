import { TabPanels } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const TransactionTabPanels = (props: Props) => {
  return (
    <TabPanels
      sx={{
        '.chakra-tabs__tab-panel': {
          mt: 2,
          pl: { base: '6px', md: 7 },
          pr: { base: '6px', md: '18px' },
          pt: '22px',
          bgColor: 'white',
          minH: '400px'
        }
      }}
    >
      {props.children}
    </TabPanels>
  );
};

export default TransactionTabPanels;
