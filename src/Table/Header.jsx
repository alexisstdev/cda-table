import { Box, Flex, Th } from '@chakra-ui/react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import React from 'react';

const Header = ({ header }) => {
  const toggleSortBy = () => {
    if (!header.isSorted) {
      header.toggleSortBy(true); // Sort ascending
    } else if (header.isSorted && header.isSortedDesc) {
      header.toggleSortBy(false); // Sort descending
    } else {
      header.clearSortBy(); // Remove sorting
    }
  };

  return (
    <Th key={crypto.randomUUID()} py={4}>
      <Flex
        {...header.getHeaderProps()}
        onClick={toggleSortBy}
        position={'relative'}
        color={header.isSorted ? 'inherit' : 'gray.500'}
        title={`Ordenar por ${header.Header}`}
        textTransform={'capitalize'}
        w={'fit-content'}
        fontWeight={'semibold'}
        alignItems={'center'}
        gap={4}
        userSelect={'none'}
        cursor={'pointer'}
      >
        {header.render('Header')}
        <Box position={'absolute'} right={'-20px'}>
          {header.isSorted &&
            (header.isSortedDesc === true ? <FiChevronDown /> : <FiChevronUp />)}
        </Box>
      </Flex>
    </Th>
  );
};

export default Header;
