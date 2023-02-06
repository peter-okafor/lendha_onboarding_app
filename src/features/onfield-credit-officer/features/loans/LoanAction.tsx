import { Button, Flex, FlexProps, Icon, Stack, Text } from '@chakra-ui/react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

interface Props extends FlexProps {
  onPayLoan?: () => void;
  onBack?: () => void;
  hasRightAction?: boolean;
  props?: FlexProps;
}
const LoanAction = ({ hasRightAction = true, ...props }: Props) => {
  const history = useNavigate();

  return (
    <Flex justifyContent='space-between' {...props}>
      <Stack
        color='gray.300'
        direction='row'
        alignItems='center'
        spacing={1}
        textStyle='sm'
        fontWeight={500}
        fontFamily='Poppins'
        onClick={() => history(-1)}
        cursor='pointer'
      >
        <Icon as={RiArrowLeftLine} color='gray.300' />
        <Text>Back</Text>
      </Stack>
      {hasRightAction && <Button onClick={props.onPayLoan}>Pay loan</Button>}
    </Flex>
  );
};

export default LoanAction;
