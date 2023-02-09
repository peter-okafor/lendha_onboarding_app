import { ReactComponent as Logo } from '@/assets/svg/logo/logo-blue.svg';
import { ReactComponent as VerticalLineSVG } from '@/assets/svg/vertical-line.svg';
import { path } from '@/routes/path';
import { typography } from '@/theme/foundations/typography';
import { globalStyles } from '@/theme/styles';
import { CREDIT_OFFICER_SIDEBAR_MENUS, SIDEBAR_WIDTH } from '@/variables/sidebar';
import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import { Link, Link as ReactRouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

const Sidebar = () => {
  const pathname = useLocation().pathname;
  const actualUri = `/${pathname.split('/')[1]}`;

  const sidebarMenus = CREDIT_OFFICER_SIDEBAR_MENUS;

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      w={SIDEBAR_WIDTH}
      h='100%'
      overflow='auto'
      display={{ base: 'none', lg: 'block' }}
      id='sidebar'
      bg='white'
      as='aside'
      fontFamily='Poppins'
    >
      <Flex flexDir='column' pt={10} h='100%'>
        <Box mx='auto'>
          <Link to={path.CUSTOMERS}>
            <Logo />
          </Link>
        </Box>
        <Box mt={20}>
          <List listStyleType='none' py={1} bgColor='transparent' textStyle='base'>
            {sidebarMenus.map((menu) => (
              <ListItem key={menu.name}>
                <ReactRouterLink to={menu.route}>
                  <LinkBox display='block'>
                    <LinkOverlay
                      as='div'
                      _hover={{
                        bgColor: `${globalStyles.colors.darkblue.DEFAULT}10`
                      }}
                      bgColor={
                        actualUri === menu.route
                          ? `${globalStyles.colors.darkblue.DEFAULT}10`
                          : 'transparent'
                      }
                      w='100%'
                      display='block'
                      px={5}
                      py='18px'
                      color={actualUri === menu.route ? 'darkblue.DEFAULT' : 'gray.200'}
                      fontWeight={actualUri === menu.route ? 'bold' : 'normal'}
                    >
                      <ListIcon
                        fontSize={`${typography.textStyles.xl.fontSize}`}
                        as={menu.icon}
                        mr='15px'
                      />
                      {menu.name}
                      {actualUri === menu.route && (
                        <Box position='absolute' top='1px' left='0'>
                          <VerticalLineSVG />
                        </Box>
                      )}
                    </LinkOverlay>
                  </LinkBox>
                </ReactRouterLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <LogoutButton />
      </Flex>
    </Box>
  );
};

export default Sidebar;

export const LogoutButton = () => {
  const navigate = useNavigate();
  const [, setEmail] = useLocalStorage('email', '');

  return (
    <Stack
      direction='row'
      color='gray.200'
      mt='auto'
      py={4}
      as='button'
      pl={5}
      onClick={() => {
        setEmail('');
        navigate(path.SIGNIN);
      }}
    >
      <RiLogoutCircleRFill fontSize='20px' />
      <Text as='span' textStyle='base'>
        Logout
      </Text>
    </Stack>
  );
};
