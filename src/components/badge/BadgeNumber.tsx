import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  number: number;
  avgNumber: number;
}
const BadgeNumber = ({ number, avgNumber }: Props) => {
  return (
    <Box bgColor='white' borderRadius='5px' p={2}>
      <Flex justifyContent='space-between'>
        <Text textStyle='base' color='black.DEFAULT'>
          {number}
        </Text>
        <Text textStyle='base' color='black.DEFAULT'>
          {avgNumber}
        </Text>
      </Flex>
    </Box>
  );
};

export default BadgeNumber;
