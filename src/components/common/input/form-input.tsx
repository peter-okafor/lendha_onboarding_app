import { Box, FormControl, Input, InputGroup, Text } from '@chakra-ui/react';
import { LendhaFormInputProps } from './types';

const FormInput = ({
  readonly = false,
  disabled = false,
  leftAddon,
  rightAddon,
  value,
  touchedField,
  handleChange,
  errorMessage,
  id,
  name,
  isErrorLabel = false,
  label = '',
  subLabel = '',
  placeholder = '',
  type = 'text',
  ...props
}: LendhaFormInputProps) => {
  // TODO: rewrite this component to extend InputProps properly
  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {isErrorLabel ? (
        <Text as='label' textStyle='sm' color='red'>
          {label}
        </Text>
      ) : (
        label && (
          <Box display='inline-block'>
            <Text as='label' htmlFor={id} className='lendha__form-text'>
              {label}
            </Text>
            {subLabel && (
              <Box
                as='span'
                sx={{
                  color: 'darkblue.DEFAULT !important'
                }}
                className='lendha__form-text'
              >
                {' '}
                {subLabel}
              </Box>
            )}
          </Box>
        )
      )}
      <InputGroup>
        {leftAddon && <>{leftAddon}</>}
        <Input
          {...props}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          isInvalid={!!(touchedField && errorMessage)}
          errorBorderColor='error'
          readOnly={readonly}
          disabled={disabled}
        />
        {rightAddon && <>{rightAddon}</>}
      </InputGroup>

      {touchedField && errorMessage ? (
        <Text as='small' className='error' color='error' textStyle='xs' mt={0}>
          {errorMessage}
        </Text>
      ) : null}
    </FormControl>
  );
};

export default FormInput;
