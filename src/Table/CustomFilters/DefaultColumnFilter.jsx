import { Box, IconButton, Input, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import React from 'react';

export function DefaultColumnFilter({ column: { filterValue = [], setFilter } }) {
  const [inputValue, setInputValue] = useState('');
  const [filterValues, setFilterValues] = useState(filterValue);

  const debouncedSetFilter = useMemo(
    () => debounce((values) => setFilter(values.length ? values : undefined), 300),
    [setFilter]
  );

  useEffect(() => {
    setFilterValues(filterValue);
  }, []);

  const addFilterValue = () => {
    if (inputValue && !filterValues.includes(inputValue)) {
      const newFilterValues = [...filterValues, inputValue];
      setFilterValues(newFilterValues);
      debouncedSetFilter(newFilterValues);
      setInputValue('');
    }
  };

  const removeFilterValue = (valueToRemove) => {
    const newFilterValues = filterValues.filter((value) => value !== valueToRemove);
    setFilterValues(newFilterValues);
    debouncedSetFilter(newFilterValues);
  };

  return (
    <Box>
      <Box display='flex' alignItems='center' gap={2}>
        <Input
          value={inputValue}
          border={'1px solid #e2e8f0'}
          bg={'white'}
          rounded={'xl'}
          size='sm'
          placeholder='Buscar'
          onChange={(e) => setInputValue(e.target.value)}
        />
        <IconButton
          aria-label='Add filter'
          icon={<FiPlus />}
          size='sm'
          border='1px solid #e2e8f0'
          bg='white'
          onClick={addFilterValue}
        />
      </Box>
      <Box mt={4}>
        {filterValues.map((value, index) => (
          <Tag
            key={index}
            size='sm'
            borderRadius='md'
            variant='solid'
            border='1px solid #e2e8f0'
            bg='white'
            color='gray.700'
            mr={1}
            mb={1}
          >
            <TagLabel>{value}</TagLabel>
            <TagCloseButton
              opacity={0.8}
              aria-label='Limpiar filtro'
              onClick={() => removeFilterValue(value)}
            />
          </Tag>
        ))}
      </Box>
    </Box>
  );
}
