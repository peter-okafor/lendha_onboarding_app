import { users, useUsersQuery } from '@/app/services/onboardingOfficer';
import { TableBadge } from '@/components/badge';
import { IconButton, TransactionTable, TransactionTabList } from '@/components/common';
import { SearchInput } from '@/components/common/';
import { PaginationWrapper } from '@/components/common/pagination/Pagination';
import { path } from '@/routes/path';
import {
  Box,
  Divider,
  Flex,
  Skeleton,
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
  Tr
} from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
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
  created_at: string;
  phone_number: string;
  status?: Status;
}
interface CustomerTableProps {
  headers: string[];
  data: TableData[];
}
const CustomerTable = (props: CustomerTableProps) => {
  const { data } = props;
  const navigate = useNavigate();

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
            {data.length > 0 ? (
              data.map((customer) => (
                <Tr
                  key={key()}
                  _hover={{
                    bgColor: '#f3f3f3',
                    cursor: 'pointer',
                    transition: 'all .1s ease-in'
                  }}
                  onClick={() => navigate(`/customers/profile/${customer.id}`)}
                >
                  <Td>{customer.name}</Td>
                  <Td>{customer.id}</Td>
                  <Td>{customer.created_at}</Td>
                  <Td>{customer.phone_number}</Td>
                  <Td>
                    <TableBadge
                      bgColor={statusColor(customer.status || 'pending').bgColor}
                      color={statusColor(customer.status || 'pending').color}
                      text={customer.status}
                      textTransform='uppercase'
                    />
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign='center' sx={{ border: 'none !important' }}>
                  <Text as='span' textStyle='2xl' fontWeight={700}>
                    No customers
                  </Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </TransactionTable>
      </TableContainer>
    </>
  );
};

const Customers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: response, isLoading } = useUsersQuery({ page: pageNumber });
  const [trigger] = users.useLazyQuerySubscription();

  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage] = useState(response?.data?.per_page || 50);

  const [customersTable, setCustomersTable] = useState<TableData[]>([]);

  useEffect(() => {
    trigger(
      {
        page: pageNumber
      },
      true
    ).then((res) => {
      const customers = res.data?.data?.data || [];
      setCustomersTable(
        customers?.map(({ name, id, created_at, phone_number, profile_status }) => ({
          name,
          id,
          created_at,
          phone_number,
          status: profile_status
        }))
      );
    });
  }, [pageNumber, trigger]);

  useEffect(() => {
    if (response?.data) {
      setPageCount(Math.ceil(response?.data?.total / itemsPerPage));
    }
  }, [itemsPerPage, response?.data]);

  const handlePageClick = (event: { selected: number }) => {
    setPageNumber(event.selected + 1);
  };

  const activeTable = customersTable.filter((customer) => customer.status === 'active');
  const pendingTable = customersTable.filter((customer) => customer.status === 'pending');
  const blockedTable = customersTable.filter((customer) => customer.status === 'blocked');

  const tableHeaders = ['Customer name', '#ID', 'Date', 'Phone number', 'Account Status'];

  return (
    <>
      <Flex
        alignItems={['center', 'normal']}
        justifyContent='space-between'
        className='lendha__container'
      >
        <Skeleton isLoaded={!isLoading}>
          <Text
            fontFamily={['Nunito', 'Poppins']}
            fontWeight={[700, 500]}
            textStyle={['base', 'xl']}
            color='black.DEFAULT'
          >
            Customers ({response?.data?.total})
          </Text>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Link to={path.CUSTOMER_NEW}>
            <IconButton icon={<RiAddFill style={{ fontSize: '20px' }} />} text='Add Customer' />
          </Link>
        </Skeleton>
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
        <Skeleton isLoaded={!isLoading}>
          <TransactionTabList tabs={['All', 'Active', 'Blocked', 'Pending']} />
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
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
              <SearchInput isDisabled={true} />
              <CustomerTable headers={tableHeaders} data={customersTable} />

              {customersTable?.map((customer) => (
                <CustomerLink key={key()} linkTo={`/customers/profile/${customer.id}`}>
                  <CustomerDetail
                    name={customer.name}
                    id={customer.id}
                    phoneNumber={customer.phone_number}
                    status={customer.status || ''}
                  />
                </CustomerLink>
              ))}

              <PaginationWrapper>
                <ReactPaginate
                  nextLabel='>'
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel='<'
                  pageClassName='pagination__item'
                  previousClassName='page-item'
                  previousLinkClassName='pagination__item'
                  nextClassName='page-item'
                  nextLinkClassName='pagination__item'
                  breakLabel='...'
                  breakLinkClassName='pagination__item'
                  containerClassName='pagination__container'
                  activeClassName='active'
                  renderOnZeroPageCount={() => null}
                />
              </PaginationWrapper>
            </TabPanel>
            <TabPanel>
              <SearchInput isDisabled={true} />
              <CustomerTable headers={tableHeaders} data={activeTable} />

              {activeTable.map((customer) => (
                <CustomerLink key={key()} linkTo={`/customers/profile/${customer.id}`}>
                  <CustomerDetail
                    name={customer.name}
                    id={customer.id}
                    phoneNumber={customer.phone_number}
                    status={customer.status || ''}
                  />
                </CustomerLink>
              ))}
            </TabPanel>
            <TabPanel>
              <SearchInput isDisabled={true} />
              <CustomerTable headers={tableHeaders} data={pendingTable} />

              {pendingTable.map((customer) => (
                <CustomerLink key={key()} linkTo={`/customers/profile/${customer.id}`}>
                  <CustomerDetail
                    name={customer.name}
                    id={customer.id}
                    phoneNumber={customer.phone_number}
                    status={customer.status || ''}
                  />
                </CustomerLink>
              ))}
            </TabPanel>
            <TabPanel>
              <SearchInput isDisabled={true} />
              <CustomerTable headers={tableHeaders} data={blockedTable} />

              {blockedTable.map((customer) => (
                <CustomerLink key={key()} linkTo={`/customers/profile/${customer.id}`}>
                  <CustomerDetail
                    name={customer.name}
                    id={customer.id}
                    phoneNumber={customer.phone_number}
                    status={customer.status || ''}
                  />
                </CustomerLink>
              ))}
            </TabPanel>
          </TabPanels>
        </Skeleton>
      </Tabs>
    </>
  );
};

export default Customers;

interface CustomerWrapperProps {
  children: ReactNode;
  linkTo?: string;
}
const CustomerLink = ({ children, linkTo = path.CUSTOMERS }: CustomerWrapperProps) => {
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
