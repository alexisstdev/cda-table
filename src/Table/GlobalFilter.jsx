import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import React from 'react';

const GlobalFilter = ({ setGlobalFilter }) => {
  return (
    <Flex gap={4} justifyContent={'left'} alignItems={'center'}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <FiSearch color='gray.300' />
        </InputLeftElement>
        <Input
          type='search'
          variant={'flushed'}
          size={'md'}
          w={'fit-content'}
          placeholder='Buscar...'
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default GlobalFilter;
