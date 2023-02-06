import { globalStyles } from '@/theme/styles';
import { Box, Text, TextProps } from '@chakra-ui/react';

interface Props extends TextProps {
  text: string;
  textProps?: TextProps;
}
const BadgeLabel = ({ text, color = 'darkblue.DEFAULT', ...textProps }: Props) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgColor={`${globalStyles.colors.darkblue.DEFAULT}15`}
      borderRadius='9px'
      border='0.5px solid'
      borderColor={`${globalStyles.colors.darkblue.DEFAULT}`}
      w='40px'
      h='15'
      className='account-badge'
    >
      <Text textStyle='xxs' color={color} {...textProps}>
        {text}
      </Text>
    </Box>
  );
};

export default BadgeLabel;
