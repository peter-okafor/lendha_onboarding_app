import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { RiArrowRightLine } from 'react-icons/ri';

interface Props {
  text: string;
  onClick: () => void;
}
const PayLoanOption = ({ text = '', onClick }: Props) => {
  return (
    <Box
      border='1px solid #D9D9D9'
      borderRadius='5px'
      py='14px'
      px={4}
      cursor='pointer'
      onClick={onClick}
    >
      <Flex alignItems='center' justifyContent='space-between'>
        <Text>{text}</Text>
        <Icon as={RiArrowRightLine} color='gray.300' w={4} h={4} />
      </Flex>
    </Box>
  );
};

export default PayLoanOption;
