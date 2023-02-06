import { globalStyles } from '@/theme/styles';
import { Tab as ChakraTab, TabProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends TabProps {
  children: ReactNode;
  props?: any;
}
const Tab = ({ children, ...props }: Props) => {
  return (
    <ChakraTab
      {...props}
      _selected={{
        borderBottom: `2px solid ${globalStyles.colors.black.DEFAULT}`,
        color: 'black.DEFAULT',
        fontWeight: '600'
      }}
    >
      {children}
    </ChakraTab>
  );
};

export default Tab;
