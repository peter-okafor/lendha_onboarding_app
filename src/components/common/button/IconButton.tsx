import { Box, Button, ButtonProps } from '@chakra-ui/react';
import { ButtonProps as LendhaButtonProps } from '../types';

export type IconBtnProps = LendhaButtonProps &
  ButtonProps & {
    props?: any;
  };
const IconButton = ({ icon, text = 'button', ...props }: IconBtnProps) => {
  return (
    <Button {...props}>
      <Box pr={2}>
        <>{icon}</>
      </Box>
      {text}
    </Button>
  );
};

export default IconButton;
