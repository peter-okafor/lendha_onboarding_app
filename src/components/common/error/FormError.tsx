import { Text } from '@chakra-ui/react';

interface Props {
  touched: any;
  error: any;
}
const FormError = ({ touched, error }: Props) => {
  return (
    <>
      {touched && error ? (
        <Text as='small' color='error' textStyle='xs' mt={0}>
          {error}
        </Text>
      ) : null}
    </>
  );
};

export default FormError;
