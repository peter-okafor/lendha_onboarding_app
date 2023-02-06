import { Text, Textarea, TextareaProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import FormControlLabel from './form-control-label';

interface Props extends TextareaProps {
  readOnly?: boolean;
  value?: string;
  touchedField?: boolean | undefined;
  errorMessage?: string | undefined;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  resize?: 'none' | 'horizontal' | 'vertical';
  handleChange?: (e: ChangeEvent<any>) => void;
  props?: TextareaProps;
}
const FormTextArea = (props: Props) => {
  const {
    errorMessage,
    id,
    label,
    name,
    touchedField,
    value,
    handleChange,
    placeholder,
    readOnly,
    resize
  } = props;

  return (
    <FormControlLabel
      controlProps={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
      label={label}
    >
      <Textarea
        readOnly={readOnly}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        isInvalid={!!(touchedField && errorMessage)}
        errorBorderColor='error'
        resize={resize}
        size='md'
        variant='outline'
        sx={{
          border: '1px solid',
          borderColor: 'gray.100',
          borderRadius: '6px',
          _focusVisible: {
            zIndex: 1,
            borderColor: 'gray.200',
            boxShadow: 'none'
          },
          _invalid: {
            borderColor: 'error',
            boxShadow: 'none'
          },
          _readOnly: {
            bgColor: '#f0f0f0',
            border: 'transparent'
          }
        }}
      />

      {touchedField && errorMessage ? (
        <Text color='error' textStyle='xs' mt={0}>
          {errorMessage}
        </Text>
      ) : null}
    </FormControlLabel>
  );
};

export default FormTextArea;
