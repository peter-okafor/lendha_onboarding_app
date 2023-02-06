import { globalStyles } from '@/theme/styles';
import { Box, Input, InputGroup, InputProps, InputRightElement, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiCalendar2Fill } from 'react-icons/ri';

interface Props {
  disabled?: boolean;
  selected: Date;
  onChange: (date: Date) => void;
  inputProps?: InputProps & { readOnly?: boolean };
  touched: boolean | undefined;
  errorMessage: string | undefined;
}
const FormDatePicker = ({
  disabled = false,
  selected,
  onChange,
  inputProps,
  errorMessage,
  touched
}: Props) => {
  return (
    <>
      <DatePicker
        disabled={disabled}
        selected={selected}
        onChange={onChange}
        yearDropdownItemNumber={5}
        scrollableYearDropdown
        showYearDropdown
        showMonthDropdown
        customInput={
          <InputGroup>
            <Input
              borderRadius='5px'
              borderColor={`${globalStyles.colors.gray[100]}80`}
              type='text'
              bgColor='white'
              readOnly
              cursor='pointer'
              zIndex={2}
              {...inputProps}
            />
            <InputRightElement pointerEvents='none'>
              <Box as='span'>
                <RiCalendar2Fill color={`${globalStyles.colors.gray[200]}`} fontSize='20px' />
              </Box>
            </InputRightElement>
          </InputGroup>
        }
      />
      {touched && errorMessage ? (
        <Text as='small' color='error' textStyle='xs' mt={0}>
          {errorMessage}
        </Text>
      ) : null}
    </>
  );
};

export default FormDatePicker;
