import DropdownText from '@/components/dropdown/DropdownText';
import DropdownWrapper from '@/components/dropdown/DropdownWrapper';
import { globalStyles } from '@/theme/styles';
import { Box, Button, ButtonProps, Divider, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useOnClickOutside } from 'usehooks-ts';
import { v4 as key } from 'uuid';
import { ButtonProps as LendhaButtonProps } from '../types';

interface Props extends LendhaButtonProps, ButtonProps {
  options: string[];
  lastOption?: boolean;
  w?: string;
  onSelect?: (e: any) => void;
  props?: any;
}

// TODO: use chakra-ui's Menu component
const DropdownButton = ({
  icon,
  text = 'Button',
  w = 'auto',
  variant = 'primary',
  options = [],
  lastOption = false,
  onSelect = () => null,
  ...props
}: Props) => {
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (lastOption) {
      return setDropdownOptions(options.slice(0, -1));
    } else {
      return setDropdownOptions(options);
    }
  }, [lastOption, options]);

  const ref = useRef(null);

  const handleClickOutside = () => {
    if (dropdown) {
      setDropdown(false);
    }
  };

  const handleClickInside = () => {
    setDropdown(!dropdown);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <Box
      ref={ref}
      onClick={handleClickInside}
      cursor='auto'
      className='dropdown'
      position='relative'
    >
      <Button
        {...props}
        display='flex'
        alignItems='center'
        variant={variant}
        color='gray.300'
        sx={{
          _hover: {
            background: 'white !important',
            color: `${globalStyles.colors.gray[300]} !important`,
            borderColor: `${globalStyles.colors.gray[100]} !important`
          },
          width: w
        }}
        // outline='1px solid yellow'
      >
        <Box pr={2}>
          <>{icon}</>
        </Box>
        <Text textStyle='sm' fontWeight={600}>
          {text}
        </Text>
        <RiArrowDownSLine color={`${globalStyles.colors.gray[300]}`} fontSize='24px' />
      </Button>

      {dropdown && dropdownOptions.length > 0 && (
        <DropdownWrapper zIndex={13} mt={1} px={0} py={2} w='100%'>
          {options.length > 0 &&
            dropdownOptions.map((item) => (
              <DropdownText onSelect={onSelect} key={key()} text={item} />
            ))}

          {lastOption && (
            <>
              <Divider />
              <DropdownText onSelect={onSelect} text={options.slice(-1)[0]} />
            </>
          )}
        </DropdownWrapper>
      )}
    </Box>
  );
};

export default DropdownButton;
