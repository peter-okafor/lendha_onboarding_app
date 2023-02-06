import { Flex, Text } from '@chakra-ui/react';
import { SVGProps } from 'react';

interface Props {
  text: string;
  icon: SVGProps<SVGSVGElement>;
}
const DrawerHeader = ({ text = '', icon }: Props) => {
  return (
    <Flex mt={4} mx={6} justifyContent='space-between'>
      <Text textStyle='base' fontWeight={600}>
        {text}
      </Text>
      <>{icon}</>
    </Flex>
  );
};

export default DrawerHeader;
