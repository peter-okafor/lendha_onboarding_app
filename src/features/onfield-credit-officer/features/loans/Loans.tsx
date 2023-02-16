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
import { ReactNode } from 'react';
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
  id: string;
  amount: number;
  status: Status | string;
}
const LoanDetail = (props: LoanDetailProps) => {
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
  id: string;
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
                onClick={() => navigate(path.CREDIT_OFFICER_PAY_LOAN)}
              >
                <Td>{loan.id}</Td>
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

const Loans = () => {
  const { data: response } = useLoansQuery();

  const loansTable: TableData[] = response
    ? response?.data.map(({ application_id, user_id, created_at, amount, status }) => ({
        id: application_id,
        name: user_id.toString(),
        date: created_at,
        amount,
        status
      }))
    : [];

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
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
                  amount={loan.amount}
                  status={loan.status}
                />
              </LoanLink>
            ))}
          </TabPanel>
          <TabPanel>
            <SearchInput />
            <LoanTable headers={tableHeaders} data={loansTable} />

            {loansTable.map((loan) => (
              <LoanLink key={key()}>
                <LoanDetail
                  name={loan.name}
                  id={loan.id}
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
const LoanLink = ({ children, linkTo = path.CREDIT_OFFICER_PAY_LOAN }: LoanLinkProps) => {
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
