import { Flex, FlexProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends FlexProps {
  text: string | ReactNode;
  props?: FlexProps;
}
const TableBadge = ({ ...props }: Props) => {
  return (
    <Flex
      justifyContent='center'
      borderRadius='5px'
      py='2px'
      px={2}
      w='fit-content'
      textTransform='capitalize'
      {...props}
    >
      {props.text}
    </Flex>
  );
};

export default TableBadge;
