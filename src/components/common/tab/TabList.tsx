import { globalStyles } from '@/theme/styles';
import { TabList, TabListProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends TabListProps {
  children: ReactNode;
  props?: TabListProps;
}
const LendhaTabList = ({ children, ...props }: Props) => {
  return (
    <TabList
      {...props}
      color='gray.200'
      maxW='fit-content'
      sx={{
        borderBottom: `1px solid`,
        borderBottomColor: globalStyles.colors.gray[100],
        '.chakra-tabs__tab': {
          _selected: {
            borderBottom: `2px solid ${globalStyles.colors.black.DEFAULT}`,
            mb: '-1px'
          }
        }
      }}
    >
      {children}
    </TabList>
  );
};

export default LendhaTabList;
