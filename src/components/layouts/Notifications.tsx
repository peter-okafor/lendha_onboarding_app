import { setNotificationOpen } from '@/app/appSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { path } from '@/routes/path';
import {
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { useRef } from 'react';
import usePortal from 'react-cool-portal';
import { Link as RRLink } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { NotificationWrapper } from './NotificationLists';

const notifications = [
  {
    id: 1,
    description: 'Your application to collect a loan of N5,000,000 has been approved',
    category: '',
    date: '10 mins ago'
  },
  {
    id: 2,
    description: 'A reminder that your loan payment date is due',
    category: 'loan',
    date: '12:00 am'
  },
  {
    id: 3,
    description: 'N5,000 has been sent to your lendha account from JOHN BELLO; GT BANK',
    category: 'transfer',
    date: '12:00 am  02-06'
  },
  {
    id: 4,
    description: 'N5,000 has been sent to your lendha account from JOHN BELLO; GT BANK',
    category: 'transfer',
    date: '12:00 am  02-06'
  },
  {
    id: 5,
    description: 'N5,000 has been sent to your lendha account from JOHN BELLO; GT BANK',
    category: 'transfer',
    date: '12:00 am  02-06'
  }
];

const Notifications = () => {
  const notificationOpen = useAppSelector((state) => state.app.isNotificationOpen);

  const dispatch = useAppDispatch();

  const { Portal } = usePortal({
    containerId: 'navbar',
    internalShowHide: false
  });

  const [breakpointIsLargerThan768] = useMediaQuery(`(min-width: 768px)`);

  const ref = useRef(null);

  const handleClickOutside = () => {
    if (notificationOpen) dispatch(setNotificationOpen(false));
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      {notificationOpen && (
        <Portal>
          <Box pos='relative' display={['none', 'block']}>
            <Flex w='full' justifyContent='end'>
              <Stack
                pos='absolute'
                top='-14px'
                right='80px'
                zIndex={20}
                bgColor='white'
                boxShadow='0px 25px 74px -32px rgba(197, 197, 197, 0.8)'
                px='14px'
                py='22px'
                borderRadius='10px'
                sx={{
                  '*': {
                    color: 'gray.300'
                  },
                  '.notifications p:first-of-type': {
                    textStyle: 'sm',
                    maxW: '320px',
                    pr: 4
                  },
                  '.notifications p:nth-of-type(2)': {
                    fontWeight: 600,
                    textStyle: 'xs'
                  }
                }}
              >
                <Text textStyle='xs' textTransform='uppercase'>
                  all notifications
                </Text>
                <Divider color='gray.100' />
                <Stack spacing={6} className='notifications' maxH='400px' overflowY='auto'>
                  {notifications.map((n) => (
                    <NotificationItem
                      key={n.id}
                      description={n.description}
                      category={n.category}
                      date={n.date}
                      onClick={() => dispatch(setNotificationOpen(false))}
                      linkTo={path.DASHBOARD_NOTIFICATIONS}
                      isLinkable={false}
                    />
                  ))}
                </Stack>
                {/* <Flex justifyContent='end'>
                  <Link
                    as={RRLink}
                    to={path.DASHBOARD_NOTIFICATIONS}
                    onClick={() => dispatch(setNotificationOpen(false))}
                    mt='60px'
                    color='darkblue.DEFAULT'
                    sx={{
                      textDecor: 'underline',
                      textStyle: 'sm'
                    }}
                  >
                    View all
                  </Link>
                </Flex> */}
              </Stack>
            </Flex>
          </Box>
        </Portal>
      )}

      {!breakpointIsLargerThan768 && (
        <Drawer
          placement='bottom'
          onClose={() => dispatch(setNotificationOpen(false))}
          isOpen={notificationOpen}
        >
          <DrawerOverlay />

          <DrawerContent borderRadius='10px' h='90%'>
            <DrawerHeader pt='26px'>
              <Text color='gray.300' textStyle='xs' textTransform='uppercase' fontWeight={700}>
                All notifications
              </Text>
            </DrawerHeader>
            <Divider />
            <NotificationWrapper>
              <Stack spacing={6} className='notifications' maxH='400px' overflowY='auto'>
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    description={n.description}
                    category={n.category}
                    date={n.date}
                    linkTo={path.DASHBOARD_NOTIFICATIONS}
                  />
                ))}
              </Stack>
            </NotificationWrapper>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Notifications;

interface NotificationItemProps {
  linkTo: string;
  description: string;
  category: string;
  date: string;
  onClick?: () => void;
  isLinkable?: boolean;
}
export const NotificationItem = (props: NotificationItemProps) => {
  return (
    <>
      {props.isLinkable ? (
        <Stack as={RRLink} to={props.linkTo} onClick={props.onClick ? props.onClick : () => null}>
          <Text>{props.description}</Text>
          <Flex justifyContent={props.category ? 'space-between' : 'end'}>
            {props.category && (
              <Text
                as='span'
                color='gray.300'
                fontSize='xs'
                fontWeight={600}
                textTransform='uppercase'
              >
                {props.category}
              </Text>
            )}
            <Text>{props.date}</Text>
          </Flex>
        </Stack>
      ) : (
        <Stack>
          <Text>{props.description}</Text>
          <Flex justifyContent='space-between'>
            {props.category && (
              <Text
                as='span'
                color='gray.300'
                fontSize='xs'
                fontWeight={600}
                textTransform='uppercase'
              >
                {props.category}
              </Text>
            )}
            <Text>{props.date}</Text>
          </Flex>
        </Stack>
      )}
    </>
  );
};
