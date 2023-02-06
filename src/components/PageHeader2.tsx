import { Text, TextProps } from '@chakra-ui/react';

interface Props extends TextProps {
  props?: TextProps;
  text: string;
}
const PageHeader2 = (props: Props) => {
  return (
    <Text
      as='h2'
      sx={{
        textStyle: { base: 'base', md: 'xl' },
        fontWeight: `600 !important`,
        fontFamily: 'Poppins',
        mb: '22px'
      }}
      {...props}
    >
      {props.text}
    </Text>
  );
};

export default PageHeader2;
