import { CSSObject, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: CSSObject | undefined;
  w?: string;
  top?: string;
  left?: string;
  right?: string;
  zIndex?: number;
  mt?: number | string;
  py?: number | string;
  px?: number | string;
  position?: 'absolute' | 'relative';
}
const DropdownWrapper = ({
  children,
  w = '100%',
  zIndex,
  top,
  left,
  right,
  mt = 'inherit',
  py = 4,
  px = 4,
  position = 'absolute'
}: Props) => {
  return (
    <Stack
      position={position}
      boxShadow={['0px 4px 8px rgba(197, 197, 197, 0.2)', '0px 4px 8px rgba(197, 197, 197, 0.2)']}
      bgColor='white'
      zIndex={zIndex}
      borderRadius='5px'
      w={w}
      overflowX='auto'
      mt={mt}
      py={py}
      px={px}
      whiteSpace='nowrap'
      top={top}
      left={left}
      right={right}
    >
      {children}
    </Stack>
  );
};

export default DropdownWrapper;
