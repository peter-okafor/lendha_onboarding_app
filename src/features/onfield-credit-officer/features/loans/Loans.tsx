import { loanSearch } from '@/app/services/misc';
import { useLoansQuery } from '@/app/services/onboardingOfficer';
import { TableBadge } from '@/components/badge';
import { TransactionTable, TransactionTabList } from '@/components/common';
import { SearchInput } from '@/components/common/';
import { path } from '@/routes/path';
import { formatNumber } from '@/utils/helpers';
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
  Tr
} from '@chakra-ui/react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as key } from 'uuid';

type Status = 'active' | 'pending' | 'declined' | 'due' | 'closed' | 'default' | string;
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
    case 'pending':
      return {
        bgColor: '#fff5e2',
        color: '#B47E17'
      };
    case 'declined':
      return {
        bgColor: '#e8e8e8',
        color: '#1A1A1A'
      };
    case 'due':
      return {
        bgColor: '#f8e8f4',
        color: '#B5188D'
      };
    case 'closed':
      return {
        bgColor: '#e2e2e9',
        color: 'darkblue.DEFAULT'
      };
    case 'default':
      return {
        bgColor: '#feeeee',
        color: 'error'
      };
    default:
      return {
        bgColor: '#feeeee',
        color: 'error'
      };
  }
};

interface LoanDetailProps {
  name: string;
  id: number;
  appId: string;
  amount: number;
  status: Status | string;
}
const LoanDetail = (props: LoanDetailProps) => {
  return (
    <Flex justifyContent='space-between' alignItems='center'>
      <Stack spacing='2px'>
        <Text fontWeight={500} textStyle='sm'>
          {props.id}
        </Text>
        <Text color='gray.300' textStyle='xs'>
          {props.appId}
        </Text>
      </Stack>
      <Stack spacing='2px'>
        <Text fontWeight={500} textStyle='sm'>
          {`N${formatNumber(props.amount)}`}
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
  id: number;
  appId: string;
  name: string;
  date: string;
  amount: number;
  status: string;
}
interface LoanTableProps {
  headers: string[];
  data: TableData[];
}
const LoanTable = (props: LoanTableProps) => {
  const navigate = useNavigate();
  const { data } = props;

  return (
    <TableContainer maxH='800px' overflowY='auto' mt={[0, '24px']} display={['none', 'block']}>
      <TransactionTable>
        <Thead>
          <Tr>
            {props.headers.map((th) => (
              <Th key={key()}>{th}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            data.map((loan) => (
              <Tr
                key={key()}
                _hover={{
                  bgColor: '#f3f3f3',
                  cursor: 'pointer',
                  transition: 'all .1s ease-in'
                }}
                onClick={() => navigate(`/loans/${loan.id}`)}
              >
                <Td>{loan.appId}</Td>
                <Td>{loan.name}</Td>
                <Td>{loan.date}</Td>
                <Td>N{formatNumber(loan.amount)}</Td>
                <Td>
                  <TableBadge
                    bgColor={statusColor(loan.status).bgColor}
                    color={statusColor(loan.status).color}
                    text={loan.status}
                    textTransform='uppercase'
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} textAlign='center' sx={{ border: 'none !important' }}>
                <Text as='span' textStyle='2xl' fontWeight={700}>
                  No loans
                </Text>
              </Td>
            </Tr>
          )}
        </Tbody>
      </TransactionTable>
    </TableContainer>
  );
};

type LoanData = {
  id: number;
  application_id: string;
  user_id: number;
  created_at: string;
  amount: number;
  status: string;
};
const Loans = () => {
  const [value, setValue] = useState('');
  const { data: response } = useLoansQuery();

  // const { data: searchedLoan } = useLoanSearchQuery({ search: value });
  // console.log({ searchedLoan });
  const [trigger] = loanSearch.useLazyQuerySubscription();

  const allLoans = useMemo(() => {
    if (response) {
      return response.data.map((loan: LoanData) => ({
        id: loan.id,
        appId: loan.application_id,
        name: loan.user_id.toString(),
        date: loan.created_at,
        amount: loan.amount,
        status: loan.status
      }));
    }
    return [];
  }, [response]);

  const [loansTable, setLoansTable] = useState(allLoans);

  useEffect(() => {
    setLoansTable(allLoans);
  }, [allLoans]);

  useEffect(() => {
    if (value.length > 2) {
      trigger(
        {
          search: value
        },
        true
      ).then((res: any) =>
        setLoansTable(
          res?.data?.data?.map((loan: LoanData) => ({
            id: loan.id,
            appId: loan.application_id,
            name: loan.user_id.toString(),
            date: loan.created_at,
            amount: loan.amount,
            status: loan.status
          }))
        )
      );
    } else {
      setLoansTable(allLoans);
    }
  }, [allLoans, trigger, value]);

  const activeTable = loansTable.filter((loan) => loan.status === 'active');
  const pendingTable = loansTable.filter((loan) => loan.status === 'pending');
  const declinedTable = loansTable.filter((loan) => loan.status === 'declined');
  const dueTable = loansTable.filter((loan) => loan.status === 'due');
  const closedTable = loansTable.filter((loan) => loan.status === 'closed');
  const defaultTable = loansTable.filter((loan) => loan.status === 'default');

  const tableHeaders = ['#ID', 'Customer name', 'Date', 'Amount', 'Status'];

  return (
    <>
      <Text
        ml={{ base: 3, lg: 0 }}
        fontFamily={['Nunito', 'Poppins']}
        fontWeight={[700, 500]}
        textStyle={['base', 'xl']}
        color='black.DEFAULT'
      >
        Loans ({loansTable.length})
      </Text>

      <Tabs
        variant='unstyled'
        mt={[7, 9]}
        w='100%'
        sx={{
          '.chakra-input__group': {
            display: { base: 'none', md: 'block' }
          }
        }}
      >
        <TransactionTabList
          tabs={['All', 'Active', 'Pending', 'Declined', 'Due', 'Closed', 'Default']}
        />

        <TabPanels
          className='lendha__container'
          sx={{
            '.chakra-tabs__tab-panel': {
              pl: { base: 0, md: 7 },
              pr: { base: 0, md: '18px' },
              pt: { base: 0, md: 5 },
              bgColor: 'white',
              minH: '400px'
            }
          }}
        >
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={activeTable} />

            {activeTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={pendingTable} />

            {pendingTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={declinedTable} />

            {declinedTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={dueTable} />

            {dueTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={closedTable} />

            {closedTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
            <LoanTable headers={tableHeaders} data={defaultTable} />

            {defaultTable.map((loan) => (
              <LoanLink key={key()} linkTo={`/loans/${loan.id}`}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  appId={loan.appId}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Loans;

interface LoanLinkProps {
  children: ReactNode;
  linkTo?: string;
}
const LoanLink = ({ children, linkTo = path.CREDIT_OFFICER_LOANS_DETAIL }: LoanLinkProps) => {
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
