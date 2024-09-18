import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import React from 'react';

const ColumnFilter = ({ columns, setFilter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedColumn, setSelectedColumn] = useState(undefined);

  useEffect(() => {
    if (!isOpen) {
      setSelectedColumn('');
    }
  }, [isOpen]);

  const handleSelectChange = (e) => {
    setSelectedColumn(e.target.value);
  };

  const handleApplyFilter = () => {
    onClose();
  };

  const handleCancelFilter = () => {
    if (selectedColumn) {
      setFilter(selectedColumn, undefined);
    }

    setSelectedColumn('');
    onClose();
  };

  return (
    <Flex direction='column' gap={4} justifyContent='left' alignItems='center'>
      <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
        <PopoverTrigger>
          <IconButton
            aria-label='Filter columns'
            icon={<FiFilter />}
            h={9}
            border='1px solid #e2e8f0'
            bg='white'
            onClick={onOpen}
          />
        </PopoverTrigger>
        <PopoverContent
          p={2}
          boxShadow='lg'
          border='1px solid #e2e8f0'
          rounded='xl'
          maxW='xl'
        >
          <PopoverArrow />
          <PopoverBody>
            <Box mb={4}>
              <FormLabel>Seleccionar columna</FormLabel>
              <Select
                placeholder='Seleccionar columna'
                onChange={handleSelectChange}
                value={selectedColumn}
                border={'1px solid #e2e8f0'}
                bg={'white'}
                rounded={'xl'}
                size='sm'
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.Header}
                  </option>
                ))}
              </Select>
            </Box>

            {selectedColumn && (
              <>
                <Box mb={4}>
                  {columns.find((col) => col.id === selectedColumn)?.canFilter &&
                    columns.find((col) => col.id === selectedColumn)?.render('Filter')}
                </Box>
              </>
            )}

            <Divider my={4} />

            <Flex justifyContent='end' gap={2}>
              <Button
                size='sm'
                border='1px solid #e2e8f0'
                bg='white'
                onClick={handleCancelFilter}
              >
                Cancelar
              </Button>
              <Button
                size='sm'
                border='1px solid #e2e8f0'
                colorScheme='blue'
                onClick={handleApplyFilter}
              >
                Aceptar
              </Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default ColumnFilter;

/* 
  useEffect(() => {
    if (!isMenuOpen) {
      setSelectedColumn(undefined);
      onPopoverClose();
    }
  }, [isMenuOpen]);

  function handleSelectChange(columnId: string): void {
    setSelectedColumn(columnId);
    onPopoverOpen();
  }

  function handleClose(): void {
    onPopoverClose();
    onMenuClose();
  }

  <Flex justifyContent="end" gap={2} mt={4}>
                    <Button
                      size="sm"
                      border={'1px solid #e2e8f0'}
                      bg={'white'}
                      onClick={() => {
                        setFilter(column.id, undefined);
                        handleClose();
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      border={'1px solid #e2e8f0'}
                      bg={'white'}
                      onClick={handleClose}
                    >
                      Aceptar
                    </Button>
                  </Flex>
*/
