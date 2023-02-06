import RadioChecked from '@/assets/svg/radio-checked.svg';
import { Box, Stack, useRadio, UseRadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends UseRadioProps {
  children: ReactNode;
}
const FormRadio = (props: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Stack direction='row' alignItems='center'>
        <Box
          {...checkbox}
          cursor='pointer'
          border='2px solid'
          w='20px'
          h='20px'
          borderColor='gray.300'
          borderRadius='full'
          _checked={{
            bgImage: `url(${RadioChecked})`,
            bgRepeat: 'no-repeat',
            border: 'none'
          }}
        />
        <Box>{props.children}</Box>
      </Stack>
    </Box>
  );
};

export default FormRadio;
