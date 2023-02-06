import { FormControl, FormControlProps, Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  label?: string;
  children: ReactNode;
  textProps?: TextProps & { htmlFor: string };
  controlProps?: FormControlProps;
}
const FormControlLabel = ({
  label = '',
  controlProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  ...props
}: Props) => {
  return (
    <FormControl {...controlProps}>
      {label && (
        <Text as='label' textStyle='sm' className='lendha__form-text' {...props.textProps}>
          {label}
        </Text>
      )}
      {props.children}
    </FormControl>
  );
};

export default FormControlLabel;
