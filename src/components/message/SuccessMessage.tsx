import { ReactComponent as CheckBlueSVG } from '@/assets/svg/verify-success-blue.svg';
import { path } from '@/routes/path';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const SuccessMessage = () => {
  return (
    <Stack spacing={4}>
      <Box display='flex' justifyContent='center' mb={4}>
        <Box bgColor='darkblue.DEFAULT' borderRadius='100%'>
          <CheckBlueSVG />
        </Box>
      </Box>
      <Stack spacing={4} textAlign='center'>
        <Text
          textStyle={['xl', '3xl']}
          color='darkblue.DEFAULT'
          fontFamily='Poppins'
          fontWeight='500 !important'
        >
          Verification Successful
        </Text>
        <Text textStyle='sm' color='gray.300'>
          And your 2-Factor Authentication is activated
        </Text>
        <Box>
          <ReactRouterLink to={path.DASHBOARD}>
            <Button borderColor='darkblue.DEFAULT' w='fit-content'>
              Proceed to Dashboard
            </Button>
          </ReactRouterLink>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SuccessMessage;
