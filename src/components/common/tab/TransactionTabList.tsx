import { Tab } from '@/components/common';
import { Flex, TabList, Text } from '@chakra-ui/react';
import { v4 as key } from 'uuid';

interface Props {
  tabs: string[];
}
const TransactionTabList = (props: Props) => {
  return (
    <Flex
      marginBottom={[0, '19px']}
      borderBottom={['1px solid', 'none']}
      borderColor='gray.100'
      justifyContent='space-between'
      alignItems='baseline'
      w={['full', 'revert']}
    >
      <TabList color='gray.300' overflowX='auto' as={Flex} gap={[0, 6]}>
        {props.tabs.map((tab) => (
          <Tab key={key()}>
            <Text sx={{ fontWeight: '600 !important' }} textStyle={['sm', 'base']}>
              {tab}
            </Text>
          </Tab>
        ))}
      </TabList>
    </Flex>
  );
};

export default TransactionTabList;
