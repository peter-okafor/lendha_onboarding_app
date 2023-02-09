import { ReactComponent as CapitalOverdraftSVG } from '@/assets/svg/capital-overdraft.svg';
import { ReactComponent as CashFlowSVG } from '@/assets/svg/cash-flow.svg';
import { ReactComponent as CustomersSVG } from '@/assets/svg/customers.svg';
import { ReactComponent as InterestRateSVG } from '@/assets/svg/interest-rate.svg';
import { ReactComponent as LendhaWatermarkSVG } from '@/assets/svg/lendha-watermark.svg';
import { ReactComponent as Logo } from '@/assets/svg/logo/logo-with-text.svg';
import AuthCarousel from '@/components/auth/AuthCarousel';
import { path } from '@/routes/path';
import { Box, Flex } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthLayout = () => {
  const navigate = useNavigate();

  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      navigate(path.CUSTOMERS);
    }
  }, [navigate, token]);

  return !token ? (
    <Box
      bg='white'
      id='auth-layout'
      sx={{
        'form .chakra-form__label, .lendha__form-text': {
          color: 'gray.300',
          textStyle: 'sm'
        }
      }}
    >
      <Flex>
        <Box
          maxW='706.29px'
          bg='darkblue.DEFAULT'
          color='white'
          display={{ base: 'none', lg: 'block' }}
          overflowX='auto'
          overflowY='auto'
          position='sticky'
          top={0}
          h='100vh'
        >
          <Box mt='80px'>
            <Box display='flex' justifyContent='center' mb={{ sm: 2, md: 8 }}>
              <Logo />
            </Box>
            <AuthCarousel
              carouselItems={[
                {
                  img: <InterestRateSVG />,
                  header: 'Low interest Rate',
                  text: 'Our interest rate is affordable.'
                },
                {
                  img: <CashFlowSVG />,
                  header: 'Simple Cash Flow Management',
                  text: 'Create invoices, control budgets and do more with our business tools'
                },
                {
                  img: <CustomersSVG />,
                  header: 'High customer satisfaction',
                  text: 'Customer satisfaction is our goal'
                },
                {
                  img: <CapitalOverdraftSVG />,
                  header: 'Working Capital Overdraft',
                  text: 'Stay ahead of your cash flow to keep your business running.'
                }
              ]}
            />
          </Box>
        </Box>
        <Box
          my={{ lg: 'auto' }}
          mb={{ base: 28, md: 'initial' }}
          overflowY='auto'
          w={['full', 'fit-content']}
          mx='auto'
        >
          <Box pos='absolute' right={0} top={-10}>
            <LendhaWatermarkSVG />
          </Box>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  ) : null;
};

export default AuthLayout;
