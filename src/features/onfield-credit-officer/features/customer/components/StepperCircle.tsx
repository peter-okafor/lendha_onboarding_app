import { Box, BoxProps, Icon, Stack, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { RiCheckLine } from 'react-icons/ri';

interface CircleProps extends BoxProps {
  icon: number | IconType;
  props?: BoxProps;
  isCompleted: boolean;
  text: string;
}
export const StepperCircle = ({ bgColor, color, icon, isCompleted, ...props }: CircleProps) => {
  return (
    <Stack>
      <Box
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        borderRadius='full'
        bgColor={bgColor}
        h={6}
        w={6}
        color={color}
        {...props}
      >
        {/* <Icon as={isCompleted ? RiCheckLine : icon} /> */}
        {isCompleted ? (
          <Icon as={RiCheckLine} />
        ) : typeof icon === 'number' ? (
          icon
        ) : (
          <Icon as={icon} />
        )}
      </Box>
      <Box pos='relative' >
        <Text fontWeight={500} textStyle='xs' pos='absolute' whiteSpace='nowrap' ml='-15px'>
          {props.text}
        </Text>
      </Box>
    </Stack>
  );
};
