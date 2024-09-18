import { Flex, IconButton, Select, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import React from 'react';

const PaginationActions = ({
  canPreviousPage,
  canNextPage,
  nextPage,
  previousPage,
  setPageSize,
  pageSize,
}) => {
  return (
    <Flex alignItems={'center'}>
      <Flex mx={4}>
        <IconButton
          aria-label='Anterior'
          rounded={'full'}
          isDisabled={!canPreviousPage}
          icon={<FiChevronLeft />}
          variant={'ghost'}
          onClick={() => {
            previousPage();
          }}
        />
        <IconButton
          rounded={'full'}
          aria-label='Siguiente'
          isDisabled={!canNextPage}
          icon={<FiChevronRight />}
          variant={'ghost'}
          onClick={() => {
            nextPage();
          }}
        />
      </Flex>
      <Flex alignItems={'center'} gap={2}>
        <Text>Filas:</Text>
        <Select
          value={pageSize}
          w={'fit-content'}
          border={'1px solid #e2e8f0'}
          rounded={'md'}
          bg={'white'}
          size={'sm'}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export default PaginationActions;
