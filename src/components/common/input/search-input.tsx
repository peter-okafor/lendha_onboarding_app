import { globalStyles } from '@/theme/styles';
import { Input, InputGroup, InputGroupProps, InputLeftElement } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

interface Props extends InputGroupProps {
  props?: InputGroupProps;
}
const SearchInput = (props: Props) => {
  const { colors } = globalStyles;

  return (
    <>
      <InputGroup {...props}>
        <InputLeftElement pointerEvents='none'>
          <RiSearchLine color={colors.gray[300]} fontSize='24px' />
        </InputLeftElement>
        <Input
          pl='3.5rem'
          type='search'
          bgColor='#f8f8fa'
          border='none'
          borderRadius='5px'
          placeholder='Search name, ID etc'
          w='352px'
          fontSize='base'
        />
      </InputGroup>
    </>
  );
};

export default SearchInput;
