import { Box } from '@chakra-ui/react';
import { SVGProps } from 'react';

interface Props {
  icon?: SVGProps<SVGSVGElement>;
  label?: string;
}
const BadgeIconLabel = ({ icon, label }: Props) => {
  return (
    <Box position='relative'>
      <>{icon}</>
      <Box
        as='span'
        borderRadius='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        textStyle='xxs'
        bgColor='error'
        color='white'
        top='-4px'
        right='-3px'
        position='absolute'
        w='16px'
        h='16px'
      >
        {label}
      </Box>
    </Box>
  );
};

export default BadgeIconLabel;
