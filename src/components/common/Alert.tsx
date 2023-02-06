import { SpinnerStyle } from '@/components/styles';
import { globalStyles } from '@/theme/styles';
import { Box, BoxProps, Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { ReactNode, SVGProps } from 'react';
import { RiCheckLine } from 'react-icons/ri';

export interface AlertProps extends BoxProps {
  icon?: SVGProps<SVGSVGElement>;
  alertTitle?: string | ReactNode;
  description?: string | ReactNode;
  children?: ReactNode;
  props?: BoxProps;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  onDone?: () => void;
  onShareReceipt?: () => void;
  onTryAgain?: () => void;
  isLoading?: boolean;
}
const Alert = ({
  icon = <RiCheckLine color={`${globalStyles.colors.yellow.DEFAULT}`} fontSize='70px' />,
  alertTitle: title = '',
  description,
  children,
  onDone,
  onShareReceipt,
  onTryAgain,
  variant = 'default',
  isLoading = false,
  ...props
}: AlertProps) => {
  return (
    <Box
      {...props}
      sx={{
        button: {
          minW: '144px !important'
        }
      }}
    >
      {isLoading ? (
        <Flex justifyContent='center' minH='300px' alignItems='center'>
          <SpinnerStyle>
            <Spinner />
          </SpinnerStyle>
        </Flex>
      ) : (
        <>
          <Stack spacing={6}>
            <Box
              mx='auto'
              border='3px solid'
              borderColor='darkblue.DEFAULT'
              w='138px'
              h='138px'
              borderRadius='full'
              display='flex'
              justifyContent='center'
            >
              {icon && (
                <Box pos='relative' my='auto'>
                  <>{icon}</>
                </Box>
              )}
            </Box>
            {typeof title === 'string' ? (
              <Text fontWeight={500} textStyle='base' textAlign='center'>
                {title}
              </Text>
            ) : (
              <Box>{title}</Box>
            )}
          </Stack>
          {description && (
            <Box
              my='22px'
              // my={0}
              textAlign='center'
              textStyle='base'
            >
              {description}
            </Box>
          )}
          {variant === 'default' && <>{children}</>}
          {variant === 'success' && (
            <Stack spacing={4}>
              <Flex justifyContent='center'>
                <Button size='md' onClick={onDone}>
                  <Text as='span'>Done</Text>
                </Button>
              </Flex>

              <Flex justifyContent='center'>
                <Button size='md' variant='secondary' onClick={onShareReceipt}>
                  <Text as='span'>Share Receipt</Text>
                </Button>
              </Flex>
            </Stack>
          )}

          {variant === 'error' && (
            <Flex justifyContent='center'>
              <Stack>
                <Button size='md' mx='auto' variant='secondary' onClick={onTryAgain}>
                  Try again
                </Button>
              </Stack>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default Alert;
