import ToggleChecked from '@/assets/svg/toggle-checked.svg';
import ToggleUnchecked from '@/assets/svg/toggle-unchecked.svg';
import { Box, CheckboxProps, Stack, useCheckbox } from '@chakra-ui/react';

const FormSwitch = (props: CheckboxProps | any) => {
  const { getInputProps, getCheckboxProps } = useCheckbox(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as='label'>
      <input {...input} />
      <Stack direction='row' alignItems='center'>
        <Box
          {...checkbox}
          cursor='pointer'
          w='22px'
          h='14px'
          bgImage={`url(${ToggleUnchecked})`}
          bgRepeat='no-repeat'
          _checked={{
            bgImage: `url(${ToggleChecked})`
          }}
        />
        <Box>{props.children}</Box>
      </Stack>
    </Box>
  );
};

export default FormSwitch;
