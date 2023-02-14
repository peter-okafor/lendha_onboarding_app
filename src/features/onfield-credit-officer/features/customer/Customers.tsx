import { useUsersQuery } from '@/app/services/onboardingOfficer';
import { TableBadge } from '@/components/badge';
import { IconButton, TransactionTable, TransactionTabList } from '@/components/common';
import { SearchInput } from '@/components/common/';
import { path } from '@/routes/path';
import {
  Box,
  Divider,
  Flex,
  Stack,
  TableContainer,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker/locale/en_NG';
import { ReactNode } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as key } from 'uuid';

type Status = 'active' | 'blocked' | 'pending' | string;
interface Color {
  bgColor: string;
  color: string;
}

const statusColor = (status: Status): Color => {
  switch (status) {
    case 'active':
      return {
        bgColor: '#e8fff1',
        color: '#219653'
      };
    case 'blocked':
      return {
        bgColor: '#feeeee',
        color: 'error'
      };
    case 'pending':
      return {
        bgColor: '#e8e9ed',
        color: 'darkblue.DEFAULT'
      };
    default:
      return {
        bgColor: '#e8e9ed',
        color: 'darkblue.DEFAULT'
      };
  }
};

interface CustomerDetailProps {
  name: string;
  id: string;
  phoneNumber: string;
  status: Status | string;
}
const CustomerDetail = (props: CustomerDetailProps) => {
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Stack spacing='2px'>
        <Text fontWeight={500} textStyle='sm'>
          {props.name}
        </Text>
        <Text color='gray.300' textStyle='xs'>
          {props.id}
        </Text>
      </Stack>
      <Stack spacing='2px'>
        <Text fontWeight={500} textStyle='sm'>
          {props.phoneNumber}
        </Text>
        <Text
          color={statusColor(props.status).color}
          textStyle='xs'
          textAlign='right'
          textTransform='uppercase'
        >
          {props.status}
        </Text>
      </Stack>
    </Flex>
  );
};

interface TableData {
  name: string;
  id: string;
  date: string;
  phoneNumber: string;
  status: Status;
}
interface CustomerTableProps {
  headers: string[];
  data: TableData[];
}
const CustomerTable = (props: CustomerTableProps) => {
  const navigate = useNavigate();
  const { data: users } = useUsersQuery();

  return (
    <>
      <TableContainer maxH='800px' overflowY='auto' mt={[0, '24px']} display={['none', 'block']}>
        <TransactionTable>
          <Thead>
            <Tr
              sx={{
                'th:nth-of-type(2)': {
                  w: { '2xl': '140px' }
                }
              }}
            >
              {props.headers.map((th) => (
                <Th key={key()}>{th}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {props.data.map((customer) => (
              <Tr
                key={key()}
                _hover={{
                  bgColor: '#f3f3f3',
                  cursor: 'pointer',
                  transition: 'all .1s ease-in'
                }}
                onClick={() => navigate(path.CREDIT_OFFICER_USER_PROFILE)}
              >
                <Td>{customer.name}</Td>
                <Td>{customer.id}</Td>
                <Td>{customer.date}</Td>
                <Td>{customer.phoneNumber}</Td>
                <Td>
                  <TableBadge
                    bgColor={statusColor(customer.status).bgColor}
                    color={statusColor(customer.status).color}
                    text={customer.status}
                    textTransform='uppercase'
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TransactionTable>
      </TableContainer>
    </>
  );
};

const Customers = () => {
  const [isLargerThan810] = useMediaQuery(`(min-width: 810px)`);
  const navigate = useNavigate();

  return (
    <>
      <Flex
        alignItems={['center', 'normal']}
        justifyContent='space-between'
        className='lendha__container'
      >
        <Text
          fontFamily={['Nunito', 'Poppins']}
          fontWeight={[700, 500]}
          textStyle={['base', 'xl']}
          color='black.DEFAULT'
        >
          Customers (123)
        </Text>
        <Link to={path.CUSTOMER_NEW}>
          <IconButton
            icon={<RiAddFill style={{ fontSize: '20px' }} />}
            text={isLargerThan810 ? 'Add Customer' : 'Add'}
          />
        </Link>
      </Flex>

      <Tabs
        variant='unstyled'
        mt={[5, 3]}
        className='lendha__container'
        sx={{
          '.chakra-input__group': {
            display: { base: 'none', md: 'block' }
          }
        }}
      >
        <TransactionTabList tabs={['All', 'Active', 'Blocked', 'Pending']} />

        <TabPanels
          sx={{
            '.chakra-tabs__tab-panel': {
              mt: { base: 0, md: 2 },
              pl: { base: '0', md: 7 },
              pr: { base: '0', md: '18px' },
              pt: { base: 0, md: 5 },
              bgColor: 'white',
              minH: '400px'
            }
          }}
        >
          <TabPanel>
            <SearchInput />
            <CustomerTable
              headers={['Customer name', '#ID', 'Date', 'Phone number', 'Account Status']}
              data={[
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'active'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'blocked'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'active'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'pending'
                }
              ]}
            />

            {['active', 'blocked', 'pending', 'active', 'blocked'].map((status) => (
              <CustomerLink key={key()}>
                <CustomerDetail
                  name={faker.name.fullName()}
                  id='0231323'
                  phoneNumber='0901 294 4885'
                  status={status}
                />
              </CustomerLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <CustomerTable
              headers={['Customer name', '#ID', 'Date', 'Phone number', 'Account Status']}
              data={[
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'active'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'active'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'active'
                }
              ]}
            />

            {['active', 'active', 'active', 'active', 'active'].map((status) => (
              <CustomerLink key={key()}>
                <CustomerDetail
                  name={faker.name.fullName()}
                  id='0231323'
                  phoneNumber='0901 294 4885'
                  status={status}
                />
              </CustomerLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <CustomerTable
              headers={['Customer name', '#ID', 'Date', 'Phone number', 'Account Status']}
              data={[
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'blocked'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'blocked'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'blocked'
                }
              ]}
            />

            {['blocked', 'blocked', 'blocked', 'blocked', 'blocked'].map((status) => (
              <Box
                display={['block', 'none']}
                key={key()}
                _hover={{
                  bgColor: '#f3f3f3',
                  cursor: 'pointer',
                  transition: 'all .1s ease-in'
                }}
                onClick={() => navigate(path.CREDIT_OFFICER_USER_PROFILE)}
              >
                <CustomerDetail
                  name={faker.name.fullName()}
                  id='0231323'
                  phoneNumber='0901 294 4885'
                  status={status}
                />
                <Divider color='gray.100' mt='18px' mb={4} />
              </Box>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <CustomerTable
              headers={['Customer name', '#ID', 'Date', 'Phone number', 'Account Status']}
              data={[
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'pending'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'pending'
                },
                {
                  name: faker.name.fullName(),
                  id: '00123R',
                  date: '1st Jul, 2022',
                  phoneNumber: faker.phone.number(),
                  status: 'pending'
                }
              ]}
            />

            {['pending', 'pending', 'pending', 'pending', 'pending'].map((status) => (
              <Box
                display={['block', 'none']}
                key={key()}
                _hover={{
                  bgColor: '#f3f3f3',
                  cursor: 'pointer',
                  transition: 'all .1s ease-in'
                }}
                onClick={() => navigate(path.CREDIT_OFFICER_USER_PROFILE)}
              >
                <CustomerDetail
                  name={faker.name.fullName()}
                  id='0231323'
                  phoneNumber='0901 294 4885'
                  status={status}
                />
                <Divider color='gray.100' mt='18px' mb={4} />
              </Box>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Customers;

interface CustomerWrapperProps {
  children: ReactNode;
  linkTo?: string;
}
const CustomerLink = ({
  children,
  linkTo = path.CREDIT_OFFICER_USER_PROFILE
}: CustomerWrapperProps) => {
  const navigate = useNavigate();

  return (
    <Box
      display={['block', 'none']}
      key={key()}
      _hover={{
        bgColor: '#f3f3f3',
        cursor: 'pointer',
        transition: 'all .1s ease-in'
      }}
      onClick={() => navigate(linkTo)}
      pt='18px'
    >
      {children}
      <Divider color='gray.100' mt={4} />
    </Box>
  );
};
