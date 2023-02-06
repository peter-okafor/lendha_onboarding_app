import { Table } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const TransactionTable = (props: Props) => {
  return (
    <Table
      sx={{
        tableLayout: 'fixed',
        th: {
          color: 'gray.400',
          fontWeight: 500,
          textStyle: 'sm',
          textTransform: 'revert',
          zIndex: 1,
          top: 0,
          pb: '22px'
        },
        'th:last-of-type': {
          // textAlign: 'center'
        },
        'th:nth-of-type(5)': {
          // textAlign: 'center'
        },
        'th, td': {
          borderBottom: '1.5px solid',
          borderColor: 'gray.100',
          px: '14px',
          letterSpacing: 0
        },
        td: {
          fontWeight: 600,
          textStyle: 'sm',
          color: '#333333',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        'td:first-of-type': {
          pl: 4,
          pr: 2
        }
      }}
    >
      {props.children}
    </Table>
  );
};

export default TransactionTable;
