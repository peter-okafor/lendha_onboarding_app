import { toggleNavbarOpen } from '@/app/appSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { path } from '@/routes/path';
import { typography } from '@/theme/foundations/typography';
import { globalStyles } from '@/theme/styles';
import { LAYOUT_PADDING, MAX_SCREEN_WIDTH } from '@/variables/general';
import { CREDIT_OFFICER_SIDEBAR_MENUS, SIDEBAR_MENUS, SIDEBAR_WIDTH } from '@/variables/sidebar';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiCloseLine, RiSearchLine } from 'react-icons/ri';
import { Link as ReactRouterLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCountdown, useReadLocalStorage } from 'usehooks-ts';
import { LendhaModal } from '../common';
import Navbar from './Navbar';
import Notifications from './Notifications';
import Sidebar, { LogoutButton } from './Sidebar';

// const TIME_OUT = 300_000;

const DashboardLayout = () => {
  const pathname = useLocation().pathname;
  const actualUri = `/${pathname.split('/')[1]}`;
  const router = useNavigate();

  const [iconColor, setIconColor] = useState(`${globalStyles.colors.gray[100]}80`);
  const [isLargerThan1280] = useMediaQuery(`(min-width: 1280px)`);

  const searchNavOpen = useAppSelector((state) => state.app.isSearchNavOpen);
  const navbarOpen = useAppSelector((state) => state.app.isNavbarOpen);
  const dispatch = useAppDispatch();

  const [intervalValue] = useState<number>(1000);

  const [count /*, { startCountdown, resetCountdown }*/] = useCountdown({
    countStart: 10,

    intervalMs: intervalValue
  });

  const [timeoutModalVisible /*setTimeoutModalVisible*/] = useState(false);
  // useEffect(() => {
  //   if (count === 0) router(path.SIGNIN);
  // }, [count, router]);

  // let initialTimer: number;

  // Whenever the user performs an action, clear the timer to reset the inactivity timer
  // function onUserAction() {
  //   clearTimeout(initialTimer);
  //   resetCountdown();
  //   initialTimer = setTimeout(() => {
  //     // If the timer is not cleared before it is triggered, it indicates that the user has been inactive for 5 minutes
  //     setTimeoutModalVisible(true);
  //     startCountdown();
  //     console.log(`User has been inactive for ${TIME_OUT / 60_000} minutes`);
  //   }, TIME_OUT);
  // }
  // // Attach the onUserAction function to events that indicate user activity, such as mouse movements and key presses
  // useEffect(() => {
  //   window.addEventListener('mousemove', onUserAction);
  //   window.addEventListener('keypress', onUserAction);
  //   return () => {
  //     window.removeEventListener('mousemove', onUserAction);
  //     window.removeEventListener('keypress', onUserAction);
  //   };
  // });

  const userEmail = useReadLocalStorage('email');
  const isCreditOfficer = userEmail === 'creditofficer@email.com';

  const [sidebarMenus] = useState<typeof SIDEBAR_MENUS>(
    isCreditOfficer ? CREDIT_OFFICER_SIDEBAR_MENUS : SIDEBAR_MENUS
  );

  return (
    <Box h='auto' id='dashboard-layout'>
      {navbarOpen && !isLargerThan1280 && (
        <Box bgColor='white' h='100vh' w='100vw' position='fixed' py={LAYOUT_PADDING} zIndex={12}>
          <Flex px={3} justifyContent='space-between' alignItems='start'>
            <ReactRouterLink to={path.USER_PROFILE} onClick={() => dispatch(toggleNavbarOpen())}>
              <Flex justifyContent='center'>
                <Stack textStyle='xs' fontFamily='Poppins' spacing={1}>
                  <Box>
                    <Avatar size='sm' name='John Doe' src='https://bit.ly/kent-c-dodds' />
                  </Box>
                  <Text fontWeight={600}>Luke James</Text>
                  <Text lineHeight='18px'>Account</Text>
                </Stack>
              </Flex>
            </ReactRouterLink>
            <Box as='button' position='relative' onClick={() => dispatch(toggleNavbarOpen())}>
              <RiCloseLine fontSize='34px' color={globalStyles.colors.gray[300]} />
            </Box>
          </Flex>

          <Stack mt={9}>
            <List listStyleType='none' py={1} bgColor='transparent' textStyle='sm'>
              {sidebarMenus.map((menu) => (
                <ListItem key={menu.name}>
                  <ReactRouterLink to={menu.route}>
                    <LinkBox display='block' onClick={() => dispatch(toggleNavbarOpen())}>
                      <LinkOverlay
                        as='div'
                        _hover={{
                          bgColor: `${globalStyles.colors.darkblue.DEFAULT}10`
                        }}
                        w='100%'
                        display='block'
                        px={5}
                        py='18px'
                        color={actualUri === menu.route ? 'darkblue.DEFAULT' : 'gray.200'}
                        fontWeight={actualUri === menu.route ? '600' : 'normal'}
                        fontFamily='Poppins'
                      >
                        <ListIcon
                          fontSize={`${typography.textStyles.xl.fontSize}`}
                          as={menu.icon}
                          mr='15px'
                        />
                        {menu.name}
                      </LinkOverlay>
                    </LinkBox>
                  </ReactRouterLink>
                </ListItem>
              ))}
            </List>
          </Stack>
          <Box pos='fixed' bottom={0}>
            <LogoutButton />
          </Box>
        </Box>
      )}
      <Sidebar />
      <Navbar />
      {searchNavOpen && !isLargerThan1280 && (
        <Box bgColor='white' h='100vh' display={{ base: 'block', lg: 'none' }}>
          <Box p={LAYOUT_PADDING}>
            <InputGroup>
              <Input
                borderRadius='5px'
                borderColor={`${globalStyles.colors.gray[100]}80`}
                type='tel'
                placeholder='Search, referece number,  transactions'
                bgColor='white'
                onFocus={() => setIconColor(`${globalStyles.colors.gray[300]}`)}
              />
              <InputRightElement pointerEvents='none'>
                <RiSearchLine color={iconColor} />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      )}

      <Box
        ml={{ lg: `calc(${SIDEBAR_WIDTH} + 38px)` }}
        mr={{ lg: 9 }}
        mb={10}
        maxW={MAX_SCREEN_WIDTH}
        sx={{
          '.lendha__container': {
            px: { base: 3, lg: 0 }
          },
          '.lendha__container + .chakra-divider': {
            color: 'gray.100'
          },
          'form .chakra-form__label, .lendha__form-text': {
            color: 'gray.300',
            textStyle: 'sm'
          },
          '.header--success': {
            textStyle: { base: 'xl', md: '2xl' },
            color: 'darkblue.DEFAULT',
            fontFamily: 'Poppins',
            fontWeight: '500 !important'
          }
        }}
      >
        <Outlet />

        <LendhaModal
          py={['30px', '32px']}
          header={
            <Text
              textAlign='center'
              color='darkblue.DEFAULT'
              textStyle='3xl'
              fontWeight={500}
              fontFamily='Poppins'
            >
              Session timeout
            </Text>
          }
          isOpen={timeoutModalVisible}
          showCloseButton={false}
          mx={[5, 0]}
        >
          <Flex justifyContent='center'>
            <Stack textAlign='center' spacing={1}>
              <Text textStyle='sm' color='gray.300'>
                You will be redirected bact to login in
              </Text>
              <Text textStyle='sm' fontWeight={700}>
                {count}s
              </Text>
            </Stack>
          </Flex>
          <Button
            textTransform='none'
            mt={10}
            size='md'
            w='full'
            variant='outline'
            onClick={() => router(path.SIGNIN)}
          >
            Back to login
          </Button>
        </LendhaModal>
      </Box>

      <Notifications />
    </Box>
  );
};

export default DashboardLayout;
