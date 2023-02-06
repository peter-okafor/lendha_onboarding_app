import { Select, SelectProps, Text } from '@chakra-ui/react';
import FormControlLabel from './form-control-label';

interface Props extends SelectProps {
  id?: string;
  name: string;
  touchedField?: boolean | undefined;
  errorMessage?: string | undefined;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  props?: SelectProps;
}

const FormSelect = ({
  id,
  name,
  touchedField,
  errorMessage,
  label = '',
  options = [],
  placeholder = '',
  ...props
}: Props) => {
  return (
    <FormControlLabel label={label} textProps={{ htmlFor: id || '' }}>
      <Select
        placeholder={placeholder}
        {...props}
        id={id}
        name={name}
        borderColor='gray.100'
        fontSize='14px'
      >
        {options.length > 0 &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Select>

      {touchedField && errorMessage ? (
        <Text as='small' color='error' textStyle='xs' mt={0}>
          {errorMessage}
        </Text>
      ) : null}
    </FormControlLabel>
  );
};

export default FormSelect;
