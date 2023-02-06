import { Card, DropdownButton, HeaderGoBack } from '@/components/common';
import { NotificationItem } from '@/components/layouts';
import { path } from '@/routes/path';
import { globalStyles } from '@/theme/styles';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { RiCalendar2Fill } from 'react-icons/ri';

const NotificationLists = () => {
  const [selectedAccountStatement, setSelectedAccountStatement] = useState('Date range');
  const [accountStatementDropdownOptions] = useState(['Date range']);

  const handleOnSelectAccountStatement = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const text = target.innerText;
    setSelectedAccountStatement(text);
  };

  const notifications = [
    {
      id: 1,
      description: 'Your application to collect a loan of N5,000,000 has been approved',
      category: '',
      date: '12:00 am  02-06'
    },
    {
      id: 2,
      description: 'A reminder that your loan payment date is due',
      category: 'loan',
      date: '12:00 am  02-06'
    },
    {
      id: 3,
      description: 'N5,000 has been sent to your lendha account from JOHN BELLO; GT BANK',
      category: 'transfer',
      date: '12:00 am  02-06'
    }
  ];

  return (
    <>
      <Box w={['100%', '626px']} maxW={{ base: '100%', md: '626px' }}>
        <Box className='lendha__container'>
          <HeaderGoBack
            header={
              <Text textAlign='center' fontFamily='Poppins'>
                All notifications
              </Text>
            }
            goBackPath={path.DASHBOARD}
          />
        </Box>
        <Card px={5} pt={3}>
          <Flex justifyContent='space-between'>
            <Stack direction='row' gap='10px' flexWrap='wrap'>
              <Button variant='outline'>Transactions</Button>
              <Button variant='outline'>Loans</Button>
              <Button variant='outline'>Payroll</Button>
              <Button variant='outline'>Invoice</Button>
              <DropdownButton
                borderColor={`${globalStyles.colors.gray[100]}`}
                icon={<RiCalendar2Fill fontSize='20px' />}
                lastOption
                options={accountStatementDropdownOptions}
                size='md'
                variant='secondary'
                text={selectedAccountStatement}
                onSelect={handleOnSelectAccountStatement}
                px={3}
                ml={[0, '10px']}
              />
            </Stack>
          </Flex>
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
        </Card>
      </Box>
    </>
  );
};

export default NotificationLists;

export const NotificationWrapper = (props: { children: ReactNode }) => {
  return (
    <Box
      py={[4, 8]}
      px='22px'
      sx={{
        '*': {
          color: 'gray.300'
        },
        '.notifications p:first-of-type': {
          textStyle: 'sm',
          pr: 4
        },
        '.notifications p:nth-of-type(2)': {
          fontWeight: 700,
          textStyle: 'xs'
        }
      }}
    >
      {props.children}
    </Box>
  );
};
