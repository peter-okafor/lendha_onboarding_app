import { TableBadge } from '@/components/badge';
import { path } from '@/routes/path';
import { formatNumber } from '@/utils/helpers';
import {
  Box,
  Divider,
  Flex,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  TableContainerProps,
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

type Status = 'active' | 'rejected' | 'paid';
const statusColor = (status: Status) => {
  switch (status) {
    case 'active':
      return {
        bgColor: '#e8fff1',
        color: '#219653'
      };
    case 'rejected':
      return {
        bgColor: '#f7e8ea',
        color: 'error'
      };
    case 'paid':
      return {
        bgColor: '#e2e2e9',
        color: 'darkblue.DEFAULT'
      };
    default:
      return {
        bgColor: '#f7e8ea',
        color: 'error'
      };
  }
};
interface TableData {
  id: string;
  date: string;
  amount: number;
  status: Status;
}

interface Props extends TableContainerProps {
  data: TableData[];
  props?: TableContainerProps;
}
const LoanHistoryTable = ({ data, ...props }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <TableContainer
        display={['none', 'block']}
        border='1px solid'
        borderColor='gray.100'
        w='816px'
        pl={7}
        {...props}
      >
        <Table
          sx={{
            caption: {
              color: 'black.DEFAULT',
              fontFamily: 'Poppins',
              textStyle: 'base'
            },
            'caption, th': {
              fontWeight: 500
            },
            th: {
              color: 'gray.200',
              textTransform: 'revert',
              pb: '22px'
            },
            'tbody tr:last-of-type td': {
              border: 0
            },
            'th, td': {
              letterSpacing: 0
            }
          }}
        >
          <TableCaption placement='top' textAlign='left' mb={6} pl={0}>
            Loan history
          </TableCaption>
          <Thead>
            <Tr>
              <Th w='200px'>#ID</Th>
              <Th w='200px'>Date </Th>
              <Th w='140px'>Loan amount</Th>
              <Th textAlign='center'>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length > 0
              ? data.map((history) => (
                  <Tr
                    key={key()}
                    _hover={{
                      bgColor: '#f3f3f3',
                      cursor: 'pointer',
                      transition: 'all .1s ease-in'
                    }}
                    onClick={() => navigate(path.CREDIT_OFFICER_PAY_LOAN)}
                  >
                    <Td color='#333333' fontWeight={600} textStyle='sm'>
                      {history.id}
                    </Td>
                    <Td color='#333333' fontWeight={600} textStyle='sm'>
                      {history.date}
                    </Td>
                    <Td color='#333333' fontWeight={600} textStyle='sm'>
                      N{formatNumber(history.amount)}
                    </Td>
                    <Td fontWeight={600} textStyle='xs'>
                      <TableBadge
                        bgColor={statusColor(history.status).bgColor}
                        color={statusColor(history.status).color}
                        text={history.status}
                        textTransform='uppercase'
                        mx='auto'
                      />
                    </Td>
                  </Tr>
                ))
              : 'no data'}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        display={['block', 'none']}
        mx={{ base: 3, lg: 0 }}
        sx={{
          hr: {
            color: 'gray.100'
          }
        }}
      >
        <Text fontFamily='Poppins' fontWeight={500} textStyle='base'>
          Loan history
        </Text>
        <Divider mt={4} />

        {data.length > 0
          ? data.map((h) => (
              <LoanHistoryLink key={key()}>
                <Flex justifyContent='space-between' alignItems='center' pt={5}>
                  <Stack spacing='2px'>
                    <Text fontWeight={500} textStyle='s'>
                      {h.id}
                    </Text>
                    <Text color='gray.300' textStyle='xs'>
                      {h.id}
                    </Text>
                  </Stack>
                  <Stack spacing='2px'>
                    <Text fontWeight={500} textStyle='sm'>
                      {`N${formatNumber(h.amount)}`}
                    </Text>
                    <Text
                      color={statusColor(h.status).color}
                      textStyle='xs'
                      textAlign='right'
                      textTransform='uppercase'
                    >
                      {h.status}
                    </Text>
                  </Stack>
                </Flex>
              </LoanHistoryLink>
            ))
          : 'no data'}
      </Box>
    </>
  );
};

export default LoanHistoryTable;

interface LoanHistoryLinkProps {
  children: ReactNode;
  linkTo?: string;
}
const LoanHistoryLink = ({
  children,
  linkTo = path.CREDIT_OFFICER_PAY_LOAN
}: LoanHistoryLinkProps) => {
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
    >
      {children}
      <Divider color='gray.100' mt={4} />
    </Box>
  );
};
