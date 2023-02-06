import { path } from '@/routes/path';
import { fontWeight } from '@/theme/foundations';
import { Box, BoxProps, Icon, Stack, StackProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

// interface Props extends BoxProps {
//   bgColor?: string | object;
//   border?: string;
//   children: ReactNode;
//   px?: number | object | string;
//   py?: number | object | string;
//   borderRadius?: number | string;
//   w?: object | string;
//   className?: string;
//   props?: BoxProps;
// }
const Card = ({
  bgColor = 'white',
  className = '',
  border = '1px solid',
  children,
  px = 2,
  py = 2,
  borderRadius = '5px',
  w = '100%',
  ...props
}: BoxProps) => {
  return (
    <Box
      bgColor={bgColor}
      px={px}
      py={py}
      border={border}
      borderColor='transparent'
      borderRadius={borderRadius}
      w={w}
      className={`card ${className}`}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;

interface CardHeaderGoBackProps extends StackProps {
  header: string | ReactNode;
  subHeader?: string | ReactNode;
  subHeaderIcon?: IconType;
  goBackPath?: string;
  onClick?: () => void;
}
export const HeaderGoBack = ({
  onClick,
  header,
  subHeader,
  subHeaderIcon,
  goBackPath
}: CardHeaderGoBackProps) => {
  const navigate = useNavigate();

  return (
    // <Stack
    //   direction='row'
    // textStyle={['base', 'xl']}
    // sx={{ fontWeight: `${fontWeight.medium} !important` }}
    //   alignItems='center'
    //   mb={4}
    // >
    //   <RiArrowLeftLine
    //     cursor='pointer'
    //     onClick={onClick ? onClick : () => navigate(goBackPath || path.WALLET)}
    //     color={`${globalStyles.colors.gray[300]}`}
    //   />
    //   <>{header}</>
    // </Stack>

    <Box
      display='inline-flex'
      alignItems='flex-start'
      gap={2}
      mb={4}
      textStyle={['base', 'xl']}
      sx={{ fontWeight: `${fontWeight.medium} !important` }}
    >
      <Icon
        mt={[0, '2px']}
        as={RiArrowLeftLine}
        color='gray.300'
        cursor='pointer'
        fontSize={['20px', '24px']}
        onClick={onClick ? onClick : () => navigate(goBackPath || path.WALLET)}
      />
      <Stack>
        <>{header}</>

        {subHeader && (
          <Stack
            color='darkblue.DEFAULT'
            alignItems='center'
            direction='row'
            gap={2}
            textStyle={['xs', 'sm']}
          >
            {typeof subHeader === 'string' ? (
              <Text color='gray.300' fontFamily='Poppins' fontWeight={500}>
                {subHeader}
              </Text>
            ) : (
              <>{subHeader}</>
            )}

            {subHeaderIcon && <Icon as={subHeaderIcon} cursor='pointer' />}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
