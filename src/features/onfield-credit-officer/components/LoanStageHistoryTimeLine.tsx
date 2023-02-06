import { Box, BoxProps, Flex, Stack, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

const TimeLineBox = ({ bgColor }: { bgColor: string }) => {
  return <Box bgColor={bgColor} w='9px' h='9px' />;
};

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  & span {
    color: black;
    font-weight: 500;
    font-size: 14px;
  }
`;

interface Props extends BoxProps {
  props?: BoxProps;
}
const LoanStageHistoryTimeLine = (props: Props) => {
  return (
    <Box border='1px solid' borderColor='gray.100' pt={4} pb={2} px={7} {...props}>
      <Text color='black.DEFAULT' fontFamily='Poppins' fontWeight={500} textStyle='sm'>
        Stage history
      </Text>
      <Flex gap={5} mt={4}>
        {/* TODO: use an object to handle this instead */}
        <FlexContainer>
          <TimeLineBox bgColor='#B5188D' /> <span>Profile and Credit check</span>
        </FlexContainer>
        <FlexContainer>
          <TimeLineBox bgColor='gray.100' /> <span>Loan Assessment</span>
        </FlexContainer>
        <FlexContainer>
          <TimeLineBox bgColor='#6DD0E7' /> <span>Guarantor Agreement</span>
        </FlexContainer>
        <FlexContainer>
          <TimeLineBox bgColor='#84C743' /> <span>Loan Approval</span>
        </FlexContainer>
        <FlexContainer>
          <TimeLineBox bgColor='darkblue.DEFAULT' /> <span>Disbursement</span>
        </FlexContainer>
        <FlexContainer>
          <TimeLineBox bgColor='darkblue.DEFAULT' /> <span>Repayment</span>
        </FlexContainer>
      </Flex>
      <Flex gap={2} flexDir='column' mt={5}>
        <Flex h={5}>
          <Box bgColor='#B5188D' w='70px' />
          <Box bgColor='gray.100' w='70px' />
          <Box bgColor='#6DD0E7' w='132px' />
          <Stack w='70px' spacing={0}>
            <Box bgColor='#84C743' h='10px' />
            <Box bgColor='darkblue.DEFAULT' h='10px' />
          </Stack>
        </Flex>
        <Stack
          direction='row'
          spacing={{ base: 12, lg: '60px' }}
          sx={{
            span: {
              color: 'black',
              fontWeight: 500,
              textStyle: 'xs'
            }
          }}
        >
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>9</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
        </Stack>
      </Flex>
      <Text color='black.DEFAULT' fontWeight={500} textStyle='xs' mx='auto' w='fit-content' mt={2}>
        No of days
      </Text>
    </Box>
  );
};

export default LoanStageHistoryTimeLine;
