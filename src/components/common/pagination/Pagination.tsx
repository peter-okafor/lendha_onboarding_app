import { Box, Flex } from '@chakra-ui/react';

const Pagination = () => {
  // TODO: hook logic to manage pagination
  return (
    <Flex
      gap={2}
      sx={{
        '.pagination__item': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          w: 'auto',
          h: '25px',
          textStyle: 'sm',
          fontWeight: 600,
          color: 'black.DEFAULT',
          border: '1.5px solid',
          borderColor: 'gray.100',
          borderRadius: '2px',
          cursor: 'pointer',
          userSelect: 'none',
          my: 'auto'
        },
        '.pagination__item.active': {
          bgColor: 'darkblue.DEFAULT'
        },
        '.pagination__item.active > a': {
          color: 'white'
        }
      }}
    >
      <Box className='pagination__item'>1</Box>
      <Box className='pagination__item'>2</Box>
      <Box className='pagination__item active'>3</Box>
      <Box className='pagination__item'>4</Box>
      <Box className='pagination__item'>5</Box>
      <Box className='pagination__item'>...</Box>
      <Box className='pagination__item'>29</Box>
      <Box className='pagination__item'>30</Box>
    </Flex>
  );
};

export default Pagination;
