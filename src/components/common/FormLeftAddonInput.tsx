import { FormInput } from '@/components/common';
import { globalStyles } from '@/theme/styles';
import { FormControl, InputGroup, InputLeftElement, InputProps, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  label: string;
  addonText?: string;
  inputProps?: InputProps & { readonly?: boolean };
  value?: string | undefined;
  errorMessage?: string | undefined;
  touchedField?: boolean | undefined;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
const FormLeftAddonInput = (props: Props) => {
  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Text className='lendha__form-text' as='label' htmlFor={props.inputProps?.id}>
        {props.label}
      </Text>
      <InputGroup
        sx={{
          'input, .chakra-input__left-element': {
            fontSize: '14px',
            color: 'gray.300'
          }
        }}
      >
        {props.addonText && (
          <InputLeftElement
            bgColor={`${globalStyles.colors.darkblue.DEFAULT}10`}
            pointerEvents='none'
            w={14}
            zIndex={1}
          >
            {props.addonText}
          </InputLeftElement>
        )}
        <FormInput
          pl={props.addonText ? 14 : ''}
          {...props.inputProps}
          value={props.value}
          handleChange={props.handleChange}
          errorMessage={props.errorMessage}
          touchedField={props.touchedField}
        />
      </InputGroup>
    </FormControl>
  );
};

export default FormLeftAddonInput;
