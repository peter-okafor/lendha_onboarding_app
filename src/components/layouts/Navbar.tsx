import {
  setNotificationOpen,
  toggleNavbarOpen,
  toggleNotification,
  toggleSearchNav
} from '@/app/appSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useProfileQuery } from '@/app/services/onboardingOfficer';
import { ReactComponent as MobileLogoSVG } from '@/assets/svg/logo/logo-blue-mobile.svg';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import { capitalize, stripDashes, stripSlashes } from '@/utils/helpers';
import { LAYOUT_PADDING } from '@/variables/general';
import { SIDEBAR_WIDTH } from '@/variables/sidebar';
import { Box, Flex, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import {
  RiCloseLine,
  RiMenuFill,
  RiNotification2Fill,
  RiQuestionFill,
  RiSearchLine
} from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { BadgeIconLabel } from '../badge';
import ProfileDropdown from '../dropdown/ProfileDropdown';
import ActivateAccountLink from './ActivateAccountLink';

const Navbar = () => {
  const [isLargerThan1280] = useMediaQuery(`(min-width: 1280px)`);

  const navOpen = useAppSelector((state) => state.app.isSearchNavOpen);

  const pathname = useLocation().pathname;
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    switch (pathname) {
      case path.CUSTOMERS:
        setPageTitle('Customer');
        break;
      case path.CUSTOMER_NEW:
        setPageTitle('Customer');
        break;
      case path.CREDIT_OFFICER_TAKE_LOAN:
        setPageTitle('Loans');
        break;
      case path.CREDIT_OFFICER_PAY_LOAN:
        setPageTitle('Loans');
        break;
      case path.CREDIT_OFFICER:
        setPageTitle('Credit Officer');
        break;
      case path.CREDIT_OFFICER_USER_PROFILE:
        setPageTitle('User profile');
        break;
      case path.CREDIT_OFFICER_LOANS:
        setPageTitle('Loans');
        break;
      default:
        setPageTitle(stripSlashes(stripDashes(pathname.split('/')[1])));
        break;
    }
  }, [pathname]);

  const dispatch = useAppDispatch();

  const handleClickInside = () => {
    dispatch(toggleNotification());
  };

  const notificationOpen = useAppSelector((state) => state.app.isNotificationOpen);

  const ref = useRef(null);

  const handleClickOutside = () => {
    if (notificationOpen) dispatch(setNotificationOpen(false));
  };

  useOnClickOutside(ref, handleClickOutside);

  const { data: officerProfile } = useProfileQuery();

  return (
    <>
      <Box
        mb={2}
        as='header'
        top={0}
        display={{ base: 'none', lg: 'block' }}
        // position='absolute'
        id='navbar'
        ref={ref}
      >
        <Flex
          justifyContent='space-between'
          alignItems='center'
          ml={{ lg: `calc(${SIDEBAR_WIDTH} + 38px)` }}
          mr={{ lg: 9 }}
          mt={LAYOUT_PADDING}
        >
          <Text as='h1' textStyle='2xl' fontFamily='Poppins' fontWeight={600}>
            {capitalize(pageTitle)}
          </Text>

          <Stack spacing={4} direction='row' alignItems='center'>
            <Flex>
              <Box as='button' onClick={handleClickInside}>
                <BadgeIconLabel
                  label='22'
                  icon={
                    <RiNotification2Fill fontSize='24px' color={globalStyles.colors.gray[300]} />
                  }
                />
              </Box>
            </Flex>
            <Box as='button'>
              <RiQuestionFill fontSize='24px' color={globalStyles.colors.gray[300]} />
            </Box>

            <ProfileDropdown
              email={officerProfile?.email || 'johndoe@mail.com'}
              name={officerProfile?.name || 'John Doe'}
            />
          </Stack>
        </Flex>
        <Box border='1px solid #eeeef0' my={5} />
      </Box>
      <Box display={{ base: 'block', lg: 'none' }} mb={2}>
        <MobileNavbar pageTitle={pageTitle} />
      </Box>
      {pathname !== path.ACCOUNT_ACTIVATION && !navOpen && !isLargerThan1280 && (
        <Flex justifyContent='center' ml={{ base: 0, lg: SIDEBAR_WIDTH }} bg='ywllow'>
          <ActivateAccountLink />
        </Flex>
      )}

      {isLargerThan1280 && (
        <Flex justifyContent='center' ml={{ base: 0, lg: SIDEBAR_WIDTH }}>
          <ActivateAccountLink />
        </Flex>
      )}
    </>
  );
};

export default Navbar;

interface Props {
  pageTitle: string;
}
const MobileNavbar = (props: Props) => {
  const dispatch = useAppDispatch();
  const navOpen = useAppSelector((state) => state.app.isSearchNavOpen);
  const { colors } = globalStyles;

  return (
    <Flex justifyContent='space-between' flexWrap='nowrap' py={LAYOUT_PADDING} px={3}>
      <Stack direction='row' alignItems='center'>
        <MobileLogoSVG />
        <Text textStyle='base' fontWeight={600}>
          {capitalize(props.pageTitle)}
        </Text>
      </Stack>
      <Stack spacing={3} direction='row' alignItems='center'>
        <Box as='button' onClick={() => dispatch(toggleSearchNav())} position='relative'>
          {navOpen ? (
            <RiCloseLine fontSize='30px' color={colors.gray[300]} />
          ) : (
            <RiSearchLine fontSize='24px' color={colors.gray[300]} />
          )}
          {/* <Icon as={RiSearchLine} fontSize='24px' color={colors.gray[300]} /> */}
        </Box>
        <Box as='button' onClick={() => dispatch(toggleNotification())}>
          <BadgeIconLabel
            label='22'
            icon={<RiNotification2Fill fontSize='24px' color={globalStyles.colors.gray[300]} />}
          />
        </Box>

        <Box as='button' onClick={() => dispatch(toggleNavbarOpen())} position='relative'>
          <RiMenuFill fontSize='24px' color={globalStyles.colors.gray[300]} />
        </Box>
      </Stack>
    </Flex>
  );
};
