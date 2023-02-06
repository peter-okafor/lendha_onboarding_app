import { Box, BoxProps, Divider, Text } from '@chakra-ui/react';

interface Props extends BoxProps {
  label: string;
  props?: any;
}
const FormDivider = ({ label = '', ...props }: Props) => {
  return (
    <>
      <Divider color='gray.100' />
      <Box {...props} sx={{ mt: '10px !important' }}>
        <Text color='gray.300'>{label}</Text>
      </Box>
      <Divider color='gray.100' sx={{ mt: '10px !important' }} />
    </>
  );
};

export default FormDivider;
