import { Box, Flex, Text } from '@chakra-ui/react';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

interface Props {
  status: 'failed' | 'declined' | 'rejected' | 'success' | 'pending' | 'paid';
  comment: string;
  time?: string;
}

const LoanStatusTimeline = ({
  status = 'declined',
  time = '12:00 PM 12th Dec. 2022',
  ...props
}: Props) => {
  const timelineBgColor =
    status === 'declined' ? 'error' : status === 'paid' ? 'yellow.DEFAULT' : 'darkblue.DEFAULT';

  return (
    <Flex alignItems='center' gap='13px'>
      <Flex
        borderRadius='full'
        maxW='46px'
        h='46px'
        w='full'
        border='1px solid '
        borderColor='gray.100'
        p='6px'
      >
        <Flex
          borderRadius='full'
          w='full'
          h='full'
          bgColor={timelineBgColor}
          sx={{
            svg: {
              color: 'white',
              fontSize: 20
            }
          }}
          alignItems='center'
          justifyContent='center'
        >
          {status === 'declined' && <RiCloseLine />}
          {status !== 'paid' && status !== 'declined' && <RiCheckLine />}
        </Flex>
      </Flex>
      <Box
        boxShadow='0px 0px 29px rgba(0, 0, 0, 0.07)'
        bgColor='white'
        px='21px'
        py='13px'
        w='full'
        sx={{
          p: {
            fontWeight: 600
          }
        }}
      >
        <Text color='black.DEFAULT' textStyle='sm'>
          {props.comment}
        </Text>
        <Text color='gray.200' textStyle='xs'>
          {time}
        </Text>
      </Box>
    </Flex>
  );
};

export default LoanStatusTimeline;
