import { Box, BoxProps } from '@chakra-ui/react';
import { SVGProps } from 'react';

interface Props extends BoxProps {
  icon: SVGProps<SVGSVGElement>;
  color?: string;
  size?: number;
  props?: BoxProps;
}
const BadgeIcon = ({ icon, color = 'white', size = 23, ...props }: Props) => {
  return (
    <Box
      bgColor={color}
      borderRadius='3px'
      w={size + 'px'}
      h={size + 'px'}
      display='flex'
      justifyContent='center'
      alignItems='center'
      {...props}
    >
      <>{icon}</>
    </Box>
  );
};

export default BadgeIcon;
