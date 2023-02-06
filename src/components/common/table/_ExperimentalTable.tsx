import {
  Box,
  Table as ChakraTable,
  TableContainer,
  TableProps,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';

interface Props extends TableProps {
  headers: HeaderGroup<any>[];
  children: ReactNode;
  props?: any;
}
const ETable = ({ headers, children, ...props }: Props) => {
  return (
    <TableContainer maxH='400px' overflowY='auto'>
      <ChakraTable variant='simple' borderRadius='10px' {...props} sx={{ td: { border: 'none' } }}>
        <Thead>
          {headers.map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    position='sticky'
                    bgColor='#f4f4f6'
                    zIndex={1}
                    top={0}
                    border='none'
                    textTransform='capitalize'
                    textStyle='base'
                    fontWeight={400}
                    cursor='pointer'
                    colSpan={header.colSpan}
                    key={header.id}
                  >
                    <Box
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler()
                      }}
                      display='inline-flex'
                      alignItems='center'
                      gap={2}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <RiArrowUpLine />,
                        desc: <RiArrowDownLine />
                      }[header.column.getIsSorted() as string] ?? null}
                    </Box>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody bg='white'>{children}</Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default ETable;
