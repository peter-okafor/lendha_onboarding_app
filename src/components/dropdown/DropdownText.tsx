import { Text } from '@chakra-ui/react';

interface Props {
  text: string;
  textStyle?: string;
  onSelect?: (e: any) => void;
}
const DropdownText = ({ text, textStyle = 'sm', onSelect }: Props) => {
  return (
    <Text
      textAlign='left'
      px={4}
      cursor='pointer'
      textStyle={textStyle}
      py={2}
      onClick={onSelect}
      textTransform='capitalize'
    >
      {text}
    </Text>
  );
};

export default DropdownText;
