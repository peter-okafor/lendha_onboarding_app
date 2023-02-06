import { globalStyles } from '@/theme/styles';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import DropdownWrapper from './DropdownWrapper';
import { useOnClickOutside } from 'usehooks-ts';

interface Props {
  label: string;
  items: string[];
}
const Dropdown = ({ label, items = [] }: Props) => {
  const [dropdown, setDropdown] = useState(false);

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
    <Flex cursor='pointer' position='relative' ref={ref} onClick={handleClickInside}>
      <Text textStyle='sm' sx={{ fontWeight: '600 !important' }}>
        {label}
      </Text>
      <Box>
        <RiArrowDownSLine color={`${globalStyles.colors.gray[300]}`} fontSize='24px' />
      </Box>
      {dropdown && items.length > 0 && (
        <DropdownWrapper left='-70px' top='25px' w='170px' zIndex={12}>
          {items.length > 0 &&
            items.map((item, i) => (
              <Text key={i} textAlign='left' textStyle='sm'>
                {item}
              </Text>
            ))}
        </DropdownWrapper>
      )}
    </Flex>
  );
};

export default Dropdown;
