import {
  Table as ChakraTable,
  TableContainer,
  TableProps,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends TableProps {
  headers?: string[];
  children: ReactNode;
  props?: any;
}
const Table = ({ headers = [], children, ...props }: Props) => {
  return (
    <TableContainer maxH='400px' overflowY='auto'>
      <ChakraTable variant='simple' borderRadius='10px' {...props} sx={{ td: { border: 'none' } }}>
        <Thead>
          <Tr>
            {headers.map((header, i) => (
              <Th
                position='sticky'
                bgColor='#f4f4f6'
                zIndex={1}
                top={0}
                key={i}
                border='none'
                textTransform='capitalize'
                textStyle='base'
                fontWeight={400}
              >
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody bg='white'>{children}</Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
